require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  method: ['GET', 'POST'],
  credentials: true
}));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURL);
mongoose.connection.on('connected', () => {
  console.log('database connected');
});

const carouselSchema = new schema({
  id: Number,
  imageURL: String
});

const categorySchema = new schema({
  id: Number,
  imageURL: String,
  title: String
});

const popularIndoorSchema = new schema({
  id: Number,
  imageURL: String,
  title: String,
  price: Number
});

const Carousel = mongoose.model('Carousel', carouselSchema, 'carousel');
const Category = mongoose.model('Category', categorySchema, 'category');
const PopularIndoor = mongoose.model('PopularIndoor',popularIndoorSchema, 'popular-indoor-plants');

app.get('/', (req, res) => {
  res.send('Server running at port 5000...')
});

app.get('/carousel', (req, res) => {
  Carousel.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/category', (req, res) => {
  Category.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/popular-indoor-plants', (req, res) => {
  PopularIndoor.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(process.env.PORT || 5000, (req, res) => {
  console.log('server listening on port 5000...');
});
