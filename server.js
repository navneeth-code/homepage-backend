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

app.use(async(req,res,next)=>{
  const chome =await  homepage.findOne({}).populate('flashSale')
  const currentDate = new Date();
  const currentTime = currentDate.getTime()
  const currentday = currentDate.getDate()
  console.log(currentDate.getDate())
  if(chome){
  if(chome.flashSale && chome.flashSale.endTime){
    if(chome.flashSale.endTime.getDate() === currentday){
      if(chome.flashSale.endTime.getTime() >= currentTime){
       await flashsale.findByIdAndDelete(chome.flashSale._id)
      
      }
    }
  }
  }
  next()
})

app.get('/home',async(req,res)=>{
  const currentDate = new Date()
  
  // chome.flashSale.startTime = null;
  // chome.flashSale.endTime = null;
  // chome.flashSale.product = [];
   const home =await  homepage.findOne()
   .populate('categories')
   .populate('discountBanner')
   .populate('flashSale')
   .populate('offers')
   .populate('imageBanner')//{'flashSale.startTime':{$gte:currentDate.toDateString()}}
  console.log(home)
  res.send(home)//
})
app.get('/home/edit',async(req,res)=>{
  const currentDate = new Date()
  
  // chome.flashSale.startTime = null;
  // chome.flashSale.endTime = null;
  // chome.flashSale.product = [];
   const home =await  homepage.findOne()//{'flashSale.startTime':{$gte:currentDate.toDateString()}}
  console.log(home)
  res.render('edit',{home})//
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
  const newoffers = []
  for(let i=0;i<categoriesUrl.length;i++){
    const Newcategory = new category({url:`${categoriesUrl[i]}`,name:`${categoriesName[i]}`});
    const saved = await Newcategory.save()
    categories.push(saved)

  }
  
  
  const Flashsale = new flashsale({
    startTime:dealsOfTheDaystart,
    endTime:dealsOfTheDayend,
    product:flashdealProducts
  })
  const NewFlashSale = await Flashsale.save()
   
   
   
  const newhomepage = new homepage({carouselImages,
  categories,
  ocassions,
  flashSale:NewFlashSale,
   spotlight,
  dealsOfTheDay,
footerContent})

  
   for(let i=0;i<offers.length;i++){
    const Newoffer= new offer({url:`${offers[i]}`});
    const saved = await Newoffer.save()
    newhomepage.offers.push(saved)

  }
  for(let i=0;i<discountBanner.length;i++){
    const Newdiscount = new discountBannerS({url:`${discountBanner[i]}`});
    const saveddisc = await Newdiscount.save()
    newhomepage.discountBanner.push(saveddisc)

  }
  for(let i=0;i<imageBanner.length;i++){
    const NewdIb = new imageBannerS({url:`${discountBanner[i]}`});
    const savedim = await NewdIb.save()
    newhomepage.imageBanner.push(savedim)

  }
 const savedHome = await newhomepage.save()
 res.send(savedHome)
})



app.put('/home/edit/:id',async(req,res)=>{
 
const idx = req.params.id
const {carouselImages,ocassions,spotlight,dealsOfTheDay,footerContent}= req.body
  const newhomepage = await homepage.findOneAndUpdate(idx,{
    carouselImages:carouselImages,
    ocassions:ocassions,
   spotlight:spotlight,
    dealsOfTheDay:dealsOfTheDay,
     footerContent})
})
app.put('/home/edit/flashsale',async(req,res)=>{
  const {dealsOfTheDaystart,dealsOfTheDayend,flashdealProducts} = req.body
    const Flashsale = new flashsale({
    startTime:dealsOfTheDaystart,
    endTime:dealsOfTheDayend,
    product:flashdealProducts
  })
  const NewFlashSale = await Flashsale.save()
  await homepage.findOneAndUpdate({flashSale:NewFlashSale})
  
})
app.put('/home/edit/categories/:id',async(req,res)=>{
  const {categoriesUrl,categoriesName} = req.body
  
    const Newcategory = await category.findByIdAndUpdate(req.params.id,{url:categoriesUrl,name:categoriesName});
  
  
})
app.put('/home/edit/discountBanner/:id',async(req,res)=>{
  const {bannerUrl} = req.body
  
    const Newcategory = await discountBannerS.findByIdAndUpdate(req.params.id,{url:bannerUr,});

  
})
app.put('/home/edit/imageBanner/:id',async(req,res)=>{
  const {bannerUrl} = req.body
  const Newcategory = await imageBannerS.findByIdAndUpdate(req.params.id,{url:bannerUrl});
    })
app.put('/home/edit/offer/:id',async(req,res)=>{
  const {bannerUrl} = req.body
  const Newcategory = await offer.findByIdAndUpdate(req.params.id,{url:bannerUrl});
    })


 



app.get('/home/delet',async(req,res)=>{
  
  const idx = req.params.id
  const resl=await homepage.findByIdAndDelete(idx)
  res.send(resl)
})


app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);