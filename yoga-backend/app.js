const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const bodyparser = require("body-parser")
const port=process.env.PORT || 8000;
const yoga=require("./Routes/yoga")
//To parse the json
app.use(express.json())
app.use(cors())

app.use(yoga)

mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://shivangi:Abc1234@flexmoney.yng3uch.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then(() => {
    console.log("connection success")
}).catch((err) => { console.log("error"+err) }
)

app.listen(port,()=>{
    console.log("connection established at"+port)
})