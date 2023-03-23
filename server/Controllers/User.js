import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import User from '../Modles/User.js'


// ........................... User Signup Method ...............................

export const register = async (req,res)=>{
    try{
        const {firstName,lastName,email,password} = req.body;
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password,salt)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
        })
        const saveUser = await newUser.save()
        res.status(201).send({"msg":"User Saved Successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
}

// ........................... User Login Method ...............................

export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({msg:"User not exist"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:"wrong details"})

        //Generating access token

        const accessToken= jwt.sign({userId:user._id},process.env.JWT_MAIN_KEY,{
            expiresIn: '30m'
        })

        // Generating refresh token

        const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);
        user.refreshToken = refreshToken;

        await user.save();
        res.status(200).json({ accessToken, refreshToken })

    }catch(err){
        console.log(err)
    }
}

// ........................... User Profile Method ...............................


export const userProfile=async(req,res)=>{
    try{
        const {userId}=req.user
        const user = await User.findById(userId)
        res.status(200).send({"User":user})
    }catch(err){
        console.log(err)
    }
}
