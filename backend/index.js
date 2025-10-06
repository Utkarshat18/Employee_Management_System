const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const db=require('./database/db');
require('dotenv').config();

const PORT=process.env.PORT || 7000;

app.use(cors());

// app.get('/',(req,res)=>{
//     console.log("Server is running");
//     res.send("API is running on server " +PORT);
// })

app.listen(PORT,()=>{
    console.log(`Connection established successfully...${PORT}`);
})