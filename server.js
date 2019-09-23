//require('./config/passport.config');


const nodeMailer=require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('user connected');
  });
  
  http.listen(4000, function(){
    console.log('listening on 4000');
  });
const expressValidator = require('express-validator');
const validator = require("email-validator");
//const expressSession = require('express-session');
const bcrypt = require('bcrypt');
//const passport=require('./config/passport.config');
//const passport=require('passport');
// create express app




// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());
//app.use(passport.initialize());
app.use(expressValidator());
//app.use(validator());
//app.use(cors());
app.use(express.static('../frontEnd'));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Chat App."});
});

// Require user routes
var routes=require('../chatApp/routes/user.routes');
app.use("/",routes);



// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});