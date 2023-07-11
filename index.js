const express = require('express');
const cors=require("cors")
const ENV = require("dotenv").config()
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express()
const DB=`mongodb+srv://admin:iXatwYMuvUwaIeMd@cluster0.jvegpfy.mongodb.net/${process.env.DATA_BASE }?retryWrites=true&w=majority`

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlparser:true
}).then(()=>console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})

const userSchema =  new mongoose.Schema({
name:{
  type:String,
  required:true
},
email:{
  type:String,
  required:true
},
age:{
  type:Number,
  required:true
}
});
const userdata=mongoose.model("users",userSchema);


app.get("/",async(req,res)=>{
 const users = await userdata.find()

 res.status(200).json(users)
})

app.post("/create-user",async(req,res)=>{
 
  try {
    const{
      name,
      email,
      age
    }=req.body
    const newUsers=new userdata({
      name,
      email,
      age
    })
  console.log(newUsers)
  
    await newUsers.save()
    if(newUsers?._id){
      res.status(200).json({message:"data successfully created!!"})
    }
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong" })
  }
})
// Start the server
app.listen(8000);

