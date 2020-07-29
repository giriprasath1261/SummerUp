from __future__ import division, print_function
# %matplotlib inline
# from tensorflow import *
from utils import *
from keras import *
from keras.layers.merge import dot, add, concatenate
from keras.layers import Embedding, Flatten
from keras.regularizers import l2
from keras.optimizers import Adam
from sklearn import *
import pandas as pd
# from numpy import Flatten
import numpy as np
from pandas_summary import DataFrameSummary
import seaborn as sns
from collections import OrderedDict
import random
import sys
import os
import csv
import json
import matplotlib.pyplot as plt
from sklearn_pandas import DataFrameMapper
from keras import backend
from keras.callbacks import EarlyStopping
from sklearn.preprocessing import MinMaxScaler
from operator import itemgetter
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

# print("Hi")
order_products_prior_df = pd.read_csv('data/order_products__prior.csv', engine='c',  
                                       dtype={'order_id': np.int32, 'product_id': np.int32,
                                              'add_to_cart_order': np.int16, 'reordered': np.int8})
order_products_train_df = pd.read_csv('data/order_products__train.csv', engine='c',  
                                      dtype={'order_id': np.int32, 'product_id': np.int32, 
                                      'add_to_cart_order': np.int16, 'reordered': np.int8})

orders_df = pd.read_csv('data/orders.csv', engine='c', 
                        dtype={'order_id': np.int32, 'user_id': np.int32, 'order_number': np.int32,
                       'order_dow': np.int8, 'order_hour_of_day': np.int8, 'days_since_prior_order': np.float16})

products_df = pd.read_csv("data/products.csv", engine='c')

aisles_df = pd.read_csv("data/aisles.csv", engine='c')

departments_df = pd.read_csv("data/departments.csv", engine='c')
aisles_id2name = pd.Series(aisles_df.aisle.values, index=aisles_df.aisle_id).to_dict()
prodid2aisle = pd.Series(products_df.aisle_id.values, index=products_df.product_id).to_dict()
prod_id2name = pd.Series(products_df.product_id.values, index=products_df.product_id).to_dict()

# print('Total number of products: {}'.format(order_products_prior_df.product_id.unique().shape[0]))
# print('Total number of users: {}'.format(orders_df.user_id.unique().shape[0]))
# print('Total number of orders placed: {}'.format(orders_df.shape[0]))
# print('Total number of products ordered: {}'.format(order_products_prior_df.shape[0]))
# print('Average number of products per order: {}'.format(round(order_products_prior_df.shape[0]/orders_df.shape[0])))

# prod_aisle_dist = products_df.groupby('aisle_id')['product_name'].count().sort_values(ascending=False)
# num_prods_per_aisle_sorted = list(zip(map(aisles_id2name.get, prod_aisle_dist.index), prod_aisle_dist.values ))

df_train = orders_df.merge(order_products_train_df, how = 'inner', on = 'order_id')
df_train = df_train.merge(products_df, how = 'inner', on = 'product_id')
df_train.sort_values(['user_id', 'order_number'], axis=0, inplace=True)

df_prior = orders_df.merge(order_products_prior_df, how = 'inner', on = 'order_id')
df_prior = df_prior.merge(products_df, how = 'inner', on = 'product_id')
df_prior.sort_values(['user_id', 'order_number'], axis=0, inplace=True)

df = pd.concat([df_prior, df_train])

#fillna
df.fillna(0,axis=0, inplace=True)
df.drop('eval_set', axis=1, inplace = True)
df.reset_index(drop = True, inplace = True)
del df_train, df_prior

sample=int(1e5)
df = df.iloc[:sample]
# print(df)
# df.head(3)

#Update product and user ids so that they are contiguous integers, which we want when using embeddings.
g=df.groupby(['user_id','product_name','product_id'])

#create prod_rating df and add a product_count feature (i.e. how many times has the user reordered the product)
prod_ratings = g['reordered'].count().reset_index()
prod_ratings.columns = ['user_id', 'product_name', 'product_id', 'product_count']

users = prod_ratings.user_id.unique()
prods = prod_ratings.product_id.unique()

userid2idx = {o:i for i,o in enumerate(users)}
prodid2idx = {o:i for i,o in enumerate(prods)}

prod_ratings.product_id = prod_ratings.product_id.apply(lambda x: prodid2idx[x])
prod_ratings.user_id = prod_ratings.user_id.apply(lambda x: userid2idx[x])

n_users = prod_ratings.user_id.nunique()
n_prods = prod_ratings.product_id.nunique()
# print(n_users, n_prods)


def round_rating(number):
    """Round a number to the closest half integer"""
    return np.round(number * 2) / 2

mapper = DataFrameMapper([(['product_count'], MinMaxScaler())], df_out=True)

#apply the mapper to each user and concatenate results
dfs = [np.round(mapper.fit_transform(prod_ratings[prod_ratings.user_id==u].copy()), 1) for u in range(n_users)]

prod_ratings['product_score'] = pd.concat(dfs).reset_index(drop=True)*4 + 1
prod_ratings['product_score'] = round_rating(prod_ratings['product_score'])#.astype(int)
#print(prod_ratings.shape)
# print(prod_ratings.head(20))

g=prod_ratings.groupby('user_id')['product_score'].count()
topUsers=g.sort_values(ascending=False)[:10]

g=prod_ratings.groupby('product_name')['product_score'].count()
topProds=g.sort_values(ascending=False)[:10]

top_r = prod_ratings.join(topUsers, rsuffix='_r', how='inner', on='user_id')
top_r = top_r.join(topProds, rsuffix='_r', how='inner', on='product_name')

# print(pd.crosstab(top_r.user_id, top_r.product_name, top_r.product_score, aggfunc=np.sum))

def embedding_input(name, n_in, n_out, reg):
    inp = Input(shape=(1,), dtype='int64', name=name)
    return inp, Embedding(input_dim=n_in, output_dim=n_out, input_length=1, embeddings_regularizer=l2(reg))(inp)

np.random.seed = 42

#split dataset into trn and val
msk = np.random.rand(len(prod_ratings)) < 0.8
trn = prod_ratings[msk]
val = prod_ratings[~msk]

#number of latent factors 
n_factors = 50

#get embedding inputs
user_in, u = embedding_input('user_in', n_users, n_factors, 10)
prod_in, p = embedding_input('prod_in', n_prods, n_factors, 10)

def create_bias(inp, n_in):
    x = Embedding(input_dim=n_in, output_dim=1, input_length=1)(inp)
    return Flatten()(x)

ub = create_bias(user_in, n_users)
pb = create_bias(prod_in, n_prods)


def rmse(y_true, y_pred):
    '''Define Root Mean Squared Error as our custom metric'''
    return backend.sqrt(backend.mean(backend.square(y_pred - y_true), axis=-1))

callbacks = [EarlyStopping(monitor='val_loss', patience=2, verbose=0)]

x = dot([u, p], axes=2)
x = Flatten()(x)
x = add([x, ub])
x = add([x, pb])
model = Model([user_in, prod_in], x)
model.compile(Adam(0.001), loss='mse', metrics=[rmse])
history = model.fit([trn.user_id, trn.product_id], trn.product_score, batch_size=64, epochs=100, 
          validation_data=([val.user_id, val.product_id], val.product_score), callbacks=callbacks)

# model.save_weights('models/simplemodel.h5')
# model.load_weights('models/simplemodel.h5')

def predictions(u_id, p_id):
    '''create a product_name:product_score dictionary '''
    return (prod_id2name[p_id], model.predict([np.array([u_id]), np.array([p_id])])[0][0])

def user_recommendation(u_id):

    rated_prods = list(set(prod_ratings[prod_ratings.user_id==u_id].product_id))
    prods_to_rate = list(set(prod_ratings.product_id) - set(prod_ratings[prod_ratings.user_id==u_id].product_id))

    scores = {}
    random.seed(42)
    for p in prods_to_rate:
           try:
              pred = predictions(u_id,p)
              scores[pred[0]] = pred[1]
           except KeyError:
                  continue   
    recos = {}
    for p in rated_prods:
           try:
              if p == 0:
                     recos[0] = -1
              recos[p] = random.random()
           except KeyError:
                  continue   
                     
    
    return sorted(recos.items(), key = itemgetter(1), reverse = True)[:10] + sorted(scores.items(), key = itemgetter(1), reverse = True)[:5]

f = open("recommendations.csv","w")
cw = csv.writer(f)
fields = ["user_id", "product_id"]
cw.writerow(fields)
recommendations = []
n_users = 3 # Comment this line to use original value of n_users
for user in range(n_users):
       d = {}
       d["user_id"] = user
       d["product_id"] = []
       reco = user_recommendation(user)
       for j in reco:
              d["product_id"].append(j[0])
              cw.writerow([user, j[0]])
       recommendations.append(d)
f.close()

json_str = {}
json_str["recommendations"] = recommendations

f = open("recommendations.json", "w")
json.dump(json_str, f)
f.close()
