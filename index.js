const express = require('express');
const homeRoute = require('./routes/home'); // this item is connect to home.js
const app = express();
const port = 3222;
const bodyParser = require('body-parser');

////connect mongoDB start/////
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/nodejs_crud');
////connect mongoDB end/////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

db.on('error', () =>
  console.log('something went wrong to connect to database')
);
db.once('open', () => {
  console.log('DB connection has been made seccessfully');
});

//Middleware setup//
//Middleware setup//
app.set('view engine', 'ejs');
app.use(express.static('public')); // use public element

//Routing//
app.use('/', homeRoute); //This means that connecting browsers"/" and (homeRoute)home.js

// app.get('/', (req, res) => res.send('hello world')); ///just use for first run localhost

app.listen(port, () => console.log(`example app listing on port ${port}`));
