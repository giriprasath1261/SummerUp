## Running the application

Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.

To create a database:
```
mongo
``` 
This will open the mongo shell. Type in ```use summerup``` to create a new database called summerup.

```
run ./script
mongo
> db.keywords.find().forEach( function(el) { el.aisles=el.aisles.substring(1,el.aisles.length-1); el.aisles=el.aisles.split(','); db.keywords.save(el); });
```

Run Express:
```
cd backend/
npm install
npm start
```

Run React:
```
cd frontend
npm install/
npm start
```
Navigate to localhost:3000/ in your browser.
