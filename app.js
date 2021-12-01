require('./globals');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const { MongoManager } = require('./src/mongo');
const api = require('./src/routes/api');
const app = express();
const logger = require('morgan');
const mongoManager = new MongoManager(config);
const passport = require('passport');
global.upload_dir_path = path.join(__dirname, 'src', 'uploads');

// var cors = require('cors');
// app.use(cors());

/**
 * CORS
 */
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./frontend/dist'));
// app.use(express.static('./admin-panel/dist'));
// app.use(express.static('./frontend/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static( path.join(process.cwd(), 'frontend','dist')));
app.use('/client', express.static( path.join(process.cwd(), 'frontend','dist')));
app.use('/client/*', express.static( path.join(process.cwd(), 'frontend','dist')));
// app.use('/client/*', express.static('./frontend/dist'));
/**
 * Connects to MongoDB
 */
mongoManager.connect();

// autoIncrement.initialize(connection);

/**
 * initializes passport authentication
 */
app.use(passport.initialize());


/**
 * Registered main api route
 */
app.use('/api', api);

/**
 * For deploying front-end
 */
// app.use('/admin', express.static('./admin-panel/dist'));
// app.use('/admin/*', express.static('./admin-panel/dist'));
/**
 * For non registered route
 */
// app.use('/', function (req, res, next) {
//   res.statusCode = 200;
//   res.json({
//     status: "success",
//     message: "Route not registered",
//     data: {}
//   })
// });

module.exports = app;
