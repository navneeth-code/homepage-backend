const mongoose = require('mongoose')
const  offerSchema = new mongoose.Schema({
        url:{type:String, required:true,default:null},
        name:{type:String, required:true}
        
 })       
        
        
const offerModel = mongoose.model('offer', offerSchema)
module.exports = offerModel;