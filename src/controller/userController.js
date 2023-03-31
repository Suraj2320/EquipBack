const userModel =require("../model/userModel")
const argon2=require("argon2")
const jwt=require("jsonwebtoken")

const signUp=async (req,res)=>{

    const {firstname,lastname,mobileNumber,password}=req.body
//console.log(firstname,lastname,password);
const hash=await argon2.hash(password)
const validUser=await userModel.findOne({mobileNumber})

try{
    if(validUser){
        res.send({message:"User already exists"})
    }
    const user=    new userModel({ firstname, lastname, mobileNumber, password: hash })
    await user.save()    
   res.status(201).send("user created")
}
catch(e){
    // console.log(e.message)
   res.send(e.message)
}
}

const logIn=async (req,res)=>{
    
    const {mobileNumber,password}=req.body;
    
    const user=await userModel.findOne({mobileNumber});
  console.log(user,password)
  if(user){
    if( await argon2.verify(user.password,password)){
        const token=jwt.sign({id:user._id,mobileNumber:user.mobileNumber},"SECRET",{expiresIn:"24 hours"})
        const refreshToken=jwt.sign({id:user._id,mobileNumber:user.mobileNumber},"REFRESH",{expiresIn:"7 days"})
        return res.status(201).send({message:"login sucess",token,refreshToken,user})
    }
    else{
        return res.status(401).send("wrong credentials")
    }
  }
  else{
    return res.status(401).send("wrong credentials")
}

}

module.exports ={logIn,signUp}