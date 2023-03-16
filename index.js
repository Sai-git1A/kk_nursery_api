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

const detailsSchema = new schema({
  id: Number,
  name: String,
  scientificName: String,
  specifications: Array,
  watering: String,
  temperature: String,
  sunlight: String,
  soil: String,
  diseases: Array,
  humidity: String,
  fertilizing: String,
  repoting: String
});

const Carousel = mongoose.model('Carousel', carouselSchema, 'carousel');
const Category = mongoose.model('Category', categorySchema, 'category');
const PopularIndoor = mongoose.model('PopularIndoor',popularIndoorSchema, 'popular-indoor-plants');
const IndoorPlants = mongoose.model('IndoorPlants', popularIndoorSchema, 'indoor-plants');
const OutdoorPlants = mongoose.model('OutdoorPlants', popularIndoorSchema, 'outdoor-plants');
const PlantingPots = mongoose.model('PlantingPots', popularIndoorSchema, 'planting-pots');
const FloweringPlants = mongoose.model('FloweringPlants', popularIndoorSchema, 'flowering-plants');
const Details = mongoose.model('Details', detailsSchema, 'details');

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

app.get('/indoor-plants', (req, res) => {
  IndoorPlants.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/outdoor-plants', (req, res) => {
  OutdoorPlants.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/planting-pots', (req, res) => {
  PlantingPots.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/flowering-plants', (req, res) => {
  FloweringPlants.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/details/:name', (req, res) => {
  Details.findOne({name: req.params.name}, (err, data) => {
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
