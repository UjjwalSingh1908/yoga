const mongoose=require("mongoose");
const { stringify } = require("querystring");
const { boolean } = require("webidl-conversions");

const User=new mongoose.Schema({
    Name:{
        require:true,
        type:String
    },
    Age:{
        require:true,
        type:Number
    },
    Email:{
        require:true,
        type:String
    },
    Contact:{
        require:true,
        type:Number
    },
    Password:{
        require:true,
        type:String
    },
    Batch:{
        require:true,
        type:String
    },
    Date:{
        type:String,
        require:true
    },
    Payment:{
        type:Boolean,
        default:false
    },
    LastPaymentDate:{
        type:String,
        default:""
    }
})

module.exports=mongoose.model("User",User);