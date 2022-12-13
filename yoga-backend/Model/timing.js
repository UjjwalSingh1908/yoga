const mongoose=require("mongoose")

const batch=new mongoose.Schema({
    UserDetails:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'user'
    },
    Batch:{
        require:true,
        type:String
    }
})

module.exports=mongoose.model("Batch",batch);