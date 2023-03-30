const homepage = require('../models/homePage')
const category = require('../models/categories')
const discountBannerS = require('../models/discountBanner')
const flashsale = require('../models/flashSale')
const imageBannerS = require('../models/imagebanners')
const offer = require('../models/offers')
const Error = require('express-error')


const createHomepage = async(req,res)=>{
 try{
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
 if(savedHome){
 res.json({savedHome})
 }else{
  res.status(500).json({msg:"something went wrong"})
 }
 } catch(e){
    throw new Error("something went wrong")
}
}


const updateHomepage = async(req,res)=>{
 try{
const idx = req.params.id
const {carouselImages,ocassions,spotlight,dealsOfTheDay,footerContent}= req.body
  const newhomepage = await homepage.findOneAndUpdate(idx,{
    carouselImages:carouselImages,
    ocassions:ocassions,
   spotlight:spotlight,
    dealsOfTheDay:dealsOfTheDay,
     footerContent})
     if(newhomepage){
      res.json({msg:"updated sucessfully"})
      }else{
       res.status(500).json({msg:"something went wrong"})
      }
  }catch(e){
    throw new Error("something went wrong")
  }
}

const getHomepage =async(req,res)=>{
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
   if(home){
    res.json({home})
    }else{
     res.status(500).json({msg:"something went wrong"})
    }
  //
}

const addFlashsale =async(req,res)=>{
  const {dealsOfTheDaystart,dealsOfTheDayend,flashdealProducts} = req.body
    const Flashsale = new flashsale({
    startTime:dealsOfTheDaystart,
    endTime:dealsOfTheDayend,
    product:flashdealProducts
  })
  const NewFlashSale = await Flashsale.save()
  const newhomepage=await homepage.findOneAndUpdate({flashSale:NewFlashSale})
  if(newhomepage){
    res.json({msg:"sdded sucessfully"})
    }else{
     res.status(500).json({msg:"something went wrong"})
    }
}
const editcategories=async(req,res)=>{
  const {categoriesUrl,categoriesName} = req.body
  
    const Newcategory = await category.findByIdAndUpdate(req.params.id,{url:categoriesUrl,name:categoriesName});
    if(Newcategory){
      res.json({msg:"updated sucessfully"})
      }else{
       res.status(500).json({msg:"something went wrong"})
      }
  
}
const updateDiscountBanner = async(req,res)=>{
  const {bannerUrl} = req.body
  console.log('update route')
  
    const Newcategory = await discountBannerS.findByIdAndUpdate(req.params.id,{url:bannerUrl});
 if(Newcategory){
   res.json("sucessfully updated")
 }else{
  res.status(500).json({msg:"something went wrong"})
 }
  
}
const updateImageBanner = async(req,res)=>{
  const {bannerUrl} = req.body
  const Newcategory = await imageBannerS.findByIdAndUpdate(req.params.id,{url:bannerUrl});
  if(Newcategory){
    res.json("sucessfully updated")
  }else{
   res.status(500).json({msg:"something went wrong"})
  }
    }
const updateoffer = async(req,res)=>{
  const {bannerUrl} = req.body
  const Newcategory = await offer.findByIdAndUpdate(req.params.id,{url:bannerUrl});
  if(Newcategory){
    res.json("sucessfully updated")
  }else{
   res.status(500).json({msg:"something went wrong"})
  }
    }
    
const addCategory = async(req,res)=>{
    const {categoriesUrl,categoriesName} = req.body
  const categori = []
  for(let i=0;i<categoriesUrl.length;i++){
    const Newcategory = new category({url:`${categoriesUrl[i]}`,name:`${categoriesName[i]}`});
    const saved = await Newcategory.save()
    categori.push(saved)

  }
const homePage = await homepage.findOne().populate('categories')
const newcategory = homePage.categories.concat(categori)

  
 const newhomepage = await homepage.findOneAndUpdate({categories:newcategory})
 if(newhomepage){
  res.json("sucessfully updated")
}else{
 res.status(500).json({msg:"something went wrong"})
}
}

const addDiscount = async(req,res)=>{
  const {bannerUrl} = req.body
  const discount = []
  for(let i=0;i<bannerUrl.length;i++){
    const Newcategory = new discountBannerS({url:`${bannerUrl[i]}`});
    const saved = await Newcategory.save()
    discount.push(saved)

  }
  const homePage = await homepage.findOne().populate('discountBanner')
 const newhomepage = await homepage.findOneAndUpdate({discountBanner:homePage.discountBanner.concat(discount)})
 if(newhomepage){
  res.json("sucessfully updated")
}else{
 res.status(500).json({msg:"something went wrong"})
}
}

const addOffer = async(req,res)=>{
  const {bannerUrl} = req.body
  const offers = []
  for(let i=0;i<bannerUrl.length;i++){
    const Newcategory = new offer({url:`${bannerUrl[i]}`});
    const saved = await Newcategory.save()
    offers.push(saved)

  }
  const homePage = await homepage.findOne().populate('offers')
const newhomepage= await homepage.findOneAndUpdate({offers:homePage.offers.concat(offers)})
if(newhomepage){
  res.json("sucessfully updated")
}else{
 res.status(500).json({msg:"something went wrong"})
}
}

const addImageBanner = async(req,res)=>{
  const {bannerUrl} = req.body
  const images = []
  for(let i=0;i<bannerUrl.length;i++){
    const Newcategory = new imageBannerS({url:`${bannerUrl[i]}`});
    const saved = await Newcategory.save()
    images.push(saved)

  }
  const homePage = await homepage.findOne().populate('imageBanner')
 const newhomepage=await homepage.findOneAndUpdate({imageBanner:homePage.imageBanner.concat(images)})
 if(newhomepage){
  res.json("sucessfully updated")
}else{
 res.status(500).json({msg:"something went wrong"})
}
}

const deleteHomepage = async(req,res)=>{
  
  const idx = req.params.id
  const resl=await homepage.findByIdAndDelete(idx)
  if(resl){
      res.json("sucessfully updated")
    }else{
     res.status(500).json({msg:"something went wrong"})
    }
  
}

const deleteCategory =async(req,res)=>{
  const idx = req.params.id
  const resl=await category.findByIdAndDelete(idx)
  if(resl){
    res.json("sucessfully updated")
  }else{
   res.status(500).json({msg:"something went wrong"})
  }
}
const deleteImage = async(req,res)=>{
  
  const idx = req.params.id
  const resl=await imageBannerS.findByIdAndDelete(idx)
  if(resl){
    res.json("sucessfully updated")
  }else{
   res.status(500).json({msg:"something went wrong"})
  }
}

const deleteDiscount = async(req,res)=>{
  console.log("delete route")
  const idx = req.params.id
  const resl=await discountBannerS.findByIdAndDelete(idx)
  if(resl){
    res.json("sucessfully updated")
  }else{
   res.status(500).json({msg:"something went wrong"})
  }
  
}

const deleteoffer = async(req,res)=>{
  
  const idx = req.params.id
  const resl=await offer.findByIdAndDelete(idx)
  res.send(resl)
  if(resl){
    res.json("sucessfully updated")
  }else{
   res.status(500).json({msg:"something went wrong"})
  }
}
const checkFlashTime = async(req,res,next)=>{
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
}

module.exports = {
    createHomepage ,
    getHomepage,
    deleteHomepage,
    updateHomepage,
    addCategory,
    editcategories,
    deleteCategory,
    addDiscount,
    updateDiscountBanner,
    deleteDiscount,
    addImageBanner,
    updateImageBanner,
    deleteImage,
    addOffer,
    updateoffer,
    deleteoffer,
    checkFlashTime,
    addFlashsale
}