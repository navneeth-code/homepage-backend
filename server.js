const express = require('express');
const homepage = require('./models/homePage')
const category = require('./models/categories')
const discountBannerS = require('./models/discountBanner')
const flashsale = require('./models/flashSale')
const imageBannerS = require('./models/imagebanners')
const offer = require('./models/offers')
const app = express();
const methodOverride = require('method-override')
const path = require('path')
const ejsMate = require('ejs-mate')
const homeController = require('./controllers/home')
// const category = require('./assets/categories')

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

app.use(homeController.checkFlashTime)


app.get('/home',homeController.getHomepage)



app.post('/home',homeController.createHomepage)



app.put('/home/edit/:id',homeController.updateHomepage)
app.put('/home/edit/flashsale',homeController.addFlashsale)
app.put('/home/edit/categories/:id',homeController.editcategories)
app.post('home/edit/discountBanner/:id',homeController.updateDiscountBanner)
app.put('/home/edit/imageBanner/:id',homeController.updateImageBanner)
app.put('/home/edit/offer/:id',homeController.updateoffer)

app.post('/home/add/category',homeController.addCategory)
app.post('/home/add/discount',homeController.addDiscount)
 app.post('/home/add/offer',homeController.addOffer)
 app.post('/home/add/imageBanner',homeController.addImageBanner)



app.delete('/home/delet/:id',homeController.deleteHomepage)
app.delete('/home/category/delet/:id',homeController.deleteCategory)
app.delete('/home/imageBanner/delet/:id',homeController.deleteImage)
app.delete('/home/discountBanner/delet/:id',homeController.deleteDiscount)
app.delete('/home/offer/delet/:id',homeController.deleteoffer)



app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);