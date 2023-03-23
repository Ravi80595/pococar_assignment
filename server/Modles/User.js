import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName:{type:String,min:2,max:40},
    lastName :{type:String,min:2,max:40},
    email :{type:String,require:true,unique:true,max:40},
    password :{type:String,require:true,min:5},   
    refreshToken: { type: String }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema)

export default User 