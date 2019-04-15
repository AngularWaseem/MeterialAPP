// app.js
const express = require('express');
const bodyParser = require('body-parser');
const techmbook = require('./routes/techmbook.route'); // Imports routes
// initialize our express app
const app = express();
const cors=require('cors');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

/*app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));*/

  /*const corsOptions = {
    origin: [process.env.URL, 'http://localhost:4200']
  }*/
  
  app.use(cors())
 // app.options('*', cors(corsOptions))

  
//database connection
const mongoose=require('mongoose');
const db="mongodb://localhost:27017/TechMBookM";
//we add this because if we dont, we may get a warning //that mongoose is default promise library is deprecated
mongoose.Promise=global.Promise;
//so we add above statement before we connect
mongoose.connect(db, function(err){
if(err){
console.log("Connection error");
}
});

let port = 3000;
app.use('/api', techmbook);
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

