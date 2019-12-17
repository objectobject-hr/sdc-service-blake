const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const getOneListing = require('../db').getOneListing;
const cors = require('cors');

const app = express();

const port = 3001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`Connected to port ${port}`));

app.get('/amenities/:id', ({ params }, res) => {
  getOneListing(params.id)
    .then((docs) => res.status(200).send(docs))
    .catch((err) => {
      console.log(err);
      res.status(404).send('Couldn\'t get listin details');
    })
})