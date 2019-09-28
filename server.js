const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const cors = require('cors');
// create express app
const app = express();
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
app.use(cors({
    origin: true,
    credentials: true
}));

// Require Notes routes

// listen for requests
const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});

const io = require('socket.io').listen(server, {log:false, origins:'*:*'});
io.set('origins', '*:*');

// io.on('connection', (client) => {
//     // client.on('subscribeToTimer', (interval) => {
//       console.log('client is subscribing to timer with interval ');
//       setInterval(() => {
//         client.emit('timer', new Date());
//       }, 10000);

//   });
  app.io = io
require('./app/routes/routes.js')(app);

//   io.sockets.on('connection', controller.respond );