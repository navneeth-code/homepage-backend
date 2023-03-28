const express = require('express');
const homepage = require('./models/homePage')
const app = express();
const methodOverride = require('method-override')
const path = require('path')
const ejsMate = require('ejs-mate')
const category = require('./assets/categories')

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

app.get('/home',async(req,res)=>{
  const home =await  homepage.find()
  res.send({home})
})
app.post('/home',async(req,res)=>{
  const {carouselImages,categoriesUrl,categoriesName,ocassions,discountBanner,offers,footerContent} = req.body;
  const categories = []
  for(let i=0;i<categoriesUrl.length;i++){
    categories.push({url:`${categoriesUrl[i]}`,name:`${categoriesName[i]}`});

  }
  const newhomepage = new homepage({carouselImages,categories,ocassions,discountBanner,offers,footerContent})
 await newhomepage.save()
})
app.put('/home/edit',async(req,res)=>{
  const {carouselImages,categoriesUrl,categoriesName,ocassions,discountBanner,offers,footerContent} = req.body;
  const categories = []
  for(let i=0;i<categoriesUrl.length;i++){
    categories.push({url:`${categoriesUrl[i]}`,name:`${categoriesName[i]}`});

  }
  const newhomepage = homepage.findOneAndUpdate({carouselImages,categories,ocassions,discountBanner,offers,footerContent})
})
// app.delete('home/delete')


app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);