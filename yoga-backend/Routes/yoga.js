const express=require("express")
const router=express.Router()
const bcryptjs=require("bcryptjs")
const User=require("../Model/user")
const Timings=require("../Model/timing")
const user = require("../Model/user")

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

router.post("/register",async (req,res)=>{
    const {Name,Age,Email,Contact,Password,Batch,Date}=req.body;
console.log(req.body);
    if(!Name || !Age || !Email || !Contact || !Password || !Batch || !Date){
        return res.json("Enter all the details")
    }
    else{
        const registeredUser=await User.findOne({Email:Email})
        console.log(req.body)
        if(registeredUser){
          return res.status(401).json("User is already registered")
        }
        else{
         req.body.Password=await bcryptjs.hash(Password,12)
         const NewUser=new User(req.body)
         await NewUser.save()
         return res.status(200).json("User Successfully Registered")
        } 
    }
})
router.post("/login",async(req,res)=>{
    const {Email,Password,Date}=req.body
    if(!Email || !Password || !Date){
        return res.json("Enter all the details")
    }
    else{
       const user=await User.findOne({Email:Email})
       if(user){
        const match=await bcryptjs.compare(Password,user.Password)
        if(!match){
            return res.status(401).json("Enter credentials are incorrect")
        }
        else{
            localStorage.setItem("Email",Email)
            console.log(localStorage.getItem("Email"))
            //checking paid and unpaid status
            if(user.LastPaymentDate){
            const  Newdate=Date.split("/")
            const olddate=user.LastPaymentDate.split("/")
            if(Number(Newdate[2]) != Number(olddate[2]) || Number(Newdate[1])!=Number(olddate[1])){
                const update=await User.findOneAndUpdate({Email:Email},{Payment:"false"})
            }
            }
            const newUser=await User.findOne({Email:Email})
            console.log(newUser)
            return res.status(200).json({message:"Login Successful",Payment:newUser.Payment})
        }
       }
       else{
        return res.status(401).json("No user is registred with this emailId")
       } 
    }
})
router.patch("/update",async (req,res)=>{
    const {Date,Batch}=req.body
    const Email=localStorage.getItem("Email")
    const user=await User.findOne({Email:Email})
    //Date - 10/11/2000
    const  Newdate=Date.split("/")
    const olddate=user.Date.split("/")
    if(Number(Newdate[2]) != Number(olddate[2]) || Number(Newdate[1])!=Number(olddate[1])){
        const update=await User.findOneAndUpdate({Email:Email},{Date:Date})
        return res.status(200).json("Batch transferred succesfully")
    }
    else{
        return res.status(401).json("Batch can be transferred in next month")
    }
})

router.patch("/payment",async(req,res)=>{
    const {Date}=req.body;
    const Email=localStorage.getItem("Email")
    

    const update=await User.findOneAndUpdate({Email:Email},{Payment:"true",LastPaymentDate:Date})
    return res.status(200).json(update)
})

module.exports=router