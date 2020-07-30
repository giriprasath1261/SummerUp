const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Product = require('./models/products');
let Keyword = require('./models/keywords');
let Aisle = require('./models/aisles');
let Recommendation = require('./models/recommendations');
let Cart = require('./models/cart');
let Counters = require('./models/counters');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/summerup', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

//Get all groceries
userRoutes.route('/products').get(function(req,res) {
	Product.find({"aisle_id":135},function(err, products) {
		if(err) {
			console.log(err);
		} else {
			res.json(products);
		}
	});
});

//Get groceries by aisle_id
userRoutes.route('/products/aisle/:aisle_id').get(function(req, res) {
  let aisle_id = req.params.aisle_id;
  Product.find({"aisle_id":aisle_id},function(err, products) {
      res.json(products);
  });
});

//get product by product id
userRoutes.route('/products/find/:product_id').get(function(req, res) {
  let product_id = req.params.product_id;
  Product.find({"product_id":product_id},function(err, products) {
      res.json(products);
  });
});

//Get all keywords
userRoutes.route('/keywords').get(function(req,res) {
	Keyword.find(function(err,keywords) {
		if(err) {
			console.log(err);
		} else {
			res.json(keywords);
		}
	});
});

//Get aisles of a keywords
userRoutes.route('/keywords/find/:keyword').get(function(req,res) {
	let keyword = req.params.keyword;
	Keyword.find({"keyword": keyword}, function(err,keywords) {
		res.json(keywords);
	}); 
});

//Find aisle with aisle id
userRoutes.route('/aisles/:aisle_id').get(function(req,res) {
	let aisle_id = req.params.aisle_id;
	Aisle.find({"aisle_id": aisle_id}, function(err,aisles) {
		res.json(aisles);
	})
})

//Get recommendation assuming user 0
userRoutes.route('/recommendations').get(function(req,res) {
	Recommendation.find({"user_id": 1}, function(err,recommendations) {
		if(err) {
			console.log(err);
		} else {
			res.json(recommendations);
		}
	});
});

//Add to cart
userRoutes.route('/cart/add').post(function(req, res) {
  let cart = new Cart(req.body);
  cart.save()
  	.then(cart => {
    	res.status(200).json({'Cart': 'Product added successfully'});
  	})
  	.catch(err => {
    	res.status(400).send('Error');
  	});
});

//Get items in cart
userRoutes.route('/cart').get(function(req,res) {
	Cart.find(function(err, carts) {
		if(err) {
			console.log(err);
		} else {
			res.json(carts);
		}
	});
});

//Get the current status of the Billing Counters
userRoutes.route('/counters').get(function(req,res) {
	Counters.find(function(err, counters) {
		if(err) {
			console.log(err);
		} else {
			res.json(counters);
		}
	});
});
//Updating the Counters Values
userRoutes.route('/counters/update').post(function(req,res) {
	let counter = new Counters(req.body);
	// console.log(id,people,products)
	Counters.update(
		{"counter_id" : counter.counter_id} ,
		{ 
			$set : 
			{
				"number_of_people" : counter.number_of_people,
				"total_products" : counter.total_products,
			}
		}
	)
		.then(counters => {
			res.status(200).json({'Counters': 'Counters updated successfully'});
		})
		.catch(err => {
			res.status(400).send('Error');
		});

});

app.use('/',userRoutes);

app.listen(PORT, function(){
	console.log("Server is running on port" + PORT);
});