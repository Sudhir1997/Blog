import mongoose from 'mongoose';

// Next is to Create a Schema for Post.

const post=new mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    date:String,
    title:String,
    content:String,
    imageName:String,
    data:Buffer,
    size:Number,
    mimetype:String,
    encoding:String
});
const registeredUser=new mongoose.Schema({
    Email:{type:String,required:true,unique:true

    },
    Password:{type:String,required:true},
    orgEmail:{type:String,required:true}
})


// And Last we created model includes collection_Name and schema
export const content=mongoose.model("post",post)

export const user=mongoose.model("registeredUser",registeredUser);
