const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Product = require('./models/products');

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

app.use('/',userRoutes);

app.listen(PORT, function(){
	console.log("Server is running on port" + PORT);
});