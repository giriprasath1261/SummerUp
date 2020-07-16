const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Grocery = require('./models/groceries');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/summerup', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

//Get all groceries
userRoutes.route('/groceries').get(function(req,res) {
	Grocery.find(function(err, groceries) {
		if(err) {
			console.log(err);
		} else {
			res.json(groceries);
		}
	});
});

//Get groceries by aisle_id
userRoutes.route('/groceries/search/:aisle_id').get(function(req, res) {
  let aisle_id = req.params.aisle_id;
  Product.find({"aisle_id":aisle_id},function(err, grocery) {
      res.json(grocery);
  });
});

app.use('/',userRoutes);

app.listen(PORT, function(){
	console.log("Server is running on port" + PORT);
});