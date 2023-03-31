const mongoose = require('mongoose')
const flashSaleSchema = new mongoose.Schema({
    startTime:{type:Date, min:new Date().toDateString()},
    endTime:{type:Date, min:new Date().toDateString()},
    disable:Boolean,
    product:[String]
    })

        
        
const flashSaleModel = mongoose.model('flashSale',flashSaleSchema)
module.exports = flashSaleModel;