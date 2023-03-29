const mongoose = require('mongoose')
const  imageBannerSchema = new mongoose.Schema({
        url:{type:String, required:true,default:null},
        
 })       
        
        
const imageBannerModel = mongoose.model('imageBanner', imageBannerSchema)
module.exports = imageBannerModel;