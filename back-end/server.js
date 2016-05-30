'use strict';
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const logger     = require('morgan');
const override   = require('method-override');
const app        = express();

// directory config
app.use('/', express.static(_dirname + '/client'));

// port config
const port = process.env.PORT || 3000;

// database & database connection config
mongoose.conect('mongodb://localhost/inspirations');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('db connected');
});

// requests logger config
app.use(logger('dev'));

// parsing config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(override('X-HTTP-Method-Override'));

// routes config
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

// server config
const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Now on port: ' + port);
});
