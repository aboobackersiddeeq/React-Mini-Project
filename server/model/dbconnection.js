const mongoose = require('mongoose');
var express = require('express');


const connectDb = async (DATABASE_URL) => {
 
mongoose.set("strictQuery", true);
    try{ 
        await mongoose.connect(DATABASE_URL )
         console.log('connected successfully..');
         
        
    }catch(error){

        console.log(error);
    }
}
module.exports = connectDb; 