const mongoose = require('mongoose');
const Details=mongoose.Schema([{
    brandname:{ 
        type: String,
         required:true
        },
    cost:{ type:Number, required:true},
    color:{ type:String,  required:true},
  sellername:{type:String, required:true}
 }])
module.exports=mongoose.model('brandname', Details)