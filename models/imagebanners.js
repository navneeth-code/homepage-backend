const mongoose = require('mongoose')
const  imageBannerSchema = new mongoose.Schema({
        url:{type:String, required:true,default:null},
        name:{type:String, required:true}
        
 })       
        
        
const imageBannerModel = mongoose.model('imageBanner', imageBannerSchema)
module.exports = imageBannerModel;//add name and url