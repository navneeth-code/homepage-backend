const express = require('express');
const hompageSchema = require('./models/homePage')
const app = express();
const methodOverride = require('method-override')
const path = require('path')
const ejsMate = require('ejs-mate')

// const bodyParser = require('body-parser')

const connectDB = require('./config/db');
app.set('views',path.join(__dirname,'./views'))
const PORT =5000 ;
// process.env.PORT;


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs')
app.use(methodOverride('_method'))

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);