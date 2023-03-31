const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
        url:{type:String, required:true,default:null},
        name:{type:String, required:true,default:null}
 })       
        
        
const categoryModel = mongoose.model('category',categorySchema)
module.exports = categoryModel;//make it object add key value is array of objects pair