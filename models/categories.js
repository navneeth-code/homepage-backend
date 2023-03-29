const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
        url:{type:String, required:true,default:null},
        name:{type:String, required:true,default:null}
 })       
        
        
const categoryModel = mongoose.model('category',categorySchema)
module.exports = categoryModel;