import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbname: "restaurant",
    }).then(()=>{
        console.log("Connected to the database successfully!!");
    }).catch(err=>{
        console.log(`Error while connecting to the database! ${err}`);
    });
};