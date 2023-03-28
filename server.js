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
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res) =>{
  res.render('form')
})

app.get('/home',async(req,res)=>{
  const currentDate = new Date()
  const chome =await  homepage.find()
  // chome.flashSale.startTime = null;
  // chome.flashSale.endTime = null;
  // chome.flashSale.product = [];
   const home =await  homepage.find({'flashSale.startTime':{$gte:currentDate.toDateString()}})
  console.log(currentDate)
  res.send(home)//
})
app.post('/home',async(req,res)=>{
 
  const {carouselImages,
  categoriesUrl,
  categoriesName,
  ocassions,
  discountBanner,
  offers,
  spotlight,
  dealsOfTheDay,
  dealsOfTheDaystart,
  dealsOfTheDayend,
  flashdealProducts,
  imageBanner,
  footerContent} = req.body;//
  const categories = []
  for(let i=0;i<categoriesUrl.length;i++){
    categories.push({url:`${categoriesUrl[i]}`,name:`${categoriesName[i]}`});

  }
  const flashSale ={
    startTime:dealsOfTheDaystart,
    endTime:dealsOfTheDayend,
    product:flashdealProducts
  }
  const newhomepage = new homepage({carouselImages,
  categories,
  ocassions,
  discountBanner,
  offers,
  spotlight,
  dealsOfTheDay,
  flashSale,
  imageBanner,
  footerContent})
 await newhomepage.save()
 res.send(newhomepage)
})
app.put('/home/edit',async(req,res)=>{
 
  const {carouselImages,
  categoriesUrl,
  categoriesName,
  ocassions,
  discountBanner,
  offers,
  spotlight,
  dealsOfTheDay,
  dealsOfTheDaystart,
  dealsOfTheDayend,
  flashdealProducts,
  imageBanner,
  footerContent} = req.body;//
  const categories = []
  for(let i=0;i<categoriesUrl.length;i++){
    categories.push({url:`${categoriesUrl[i]}`,name:`${categoriesName[i]}`});

  }
  const flashSale ={
    startTime:dealsOfTheDaystart,
    endTime:dealsOfTheDayend,
    product:flashdealProducts
  }
  const newhomepage = await homepage.findOneAndUpdate({carouselImages,
  categories,
  ocassions,
  discountBanner,
  offers,
  spotlight,
  dealsOfTheDay,
  flashSale,
  imageBanner,
  footerContent})

 res.send(newhomepage)
})
app.delete('home/delete/:id',async(req,res)=>{
  const idx = req.params.id
  await homepage.findByIdAndDelete(idx)
})


app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);