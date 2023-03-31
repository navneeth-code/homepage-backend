const mongoose = require('mongoose')
const discountBannerSchema = new mongoose.Schema({
        url:{type:String, required:true,default:null},
        name:{type:String, required:true}
        
 })       
        
        
const discountBannerModel = mongoose.model('discountBanner',discountBannerSchema)
module.exports = discountBannerModel;