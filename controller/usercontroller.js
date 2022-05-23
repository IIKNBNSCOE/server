const jwt=require("jsonwebtoken")
const usermodel=require('../model/usermodel')

/*** Login */
var login=(req,res)=>
{
    usermodel.findOne({username:req.body.username},(err,doc)=>
    {
        if(err)
        {
            res.status(500).json({message:"Server Error.. Please try after some time"})
        }
        else{
            if(!doc)
            {
                res.status(200).json({message:"user does not exists"})
            }
            else
            {
           if(req.body.password === doc.password)
           {
            const token=jwt.sign({id:doc._id},process.env.JWT_SECRET_KEY,{expiresIn:"3600s"})
            res.status(200).json({message:"valid User",token:token});                   
           }
           else
           res.status(401).json({message:"invalid User, Password dont match"});
            }
        }
    })
}

/*** Register */
const register=(req,res)=>
{
  const umodel=new usermodel(req.body)
  umodel.save((err,doc)=>
  {
      if(err)
      {
        res.json({message:"Duplicate username or email... Use unique one"});
      }
      else
      {
        res.json({message:"Registration is successful, You may login now"})
      }
  })
}

/*** User Detail */
const userdetail=(req,res)=>
{
  console.log("hi "+req.id+" "+req.b)
  if(req.b == true)
  {
    usermodel.findOne({_id:req.id},(err,doc)=>
    {
       if(err)
       {
           console.log("hi")
           res.send({message:"Server Error.. Please try after some time"})          
       }
       else{
           if(!doc)
           {
               res.send({message:"User Does not exists"})              
           }
           else
           {
             res.send({user:doc.username})          
                                   
           }    
        }
     })
}
}

/*** Verify User */
var verify=(req,res,next)=>
{
  if(req.b == true)
  {
    console.log("verify method",req.id);
    usermodel.findOne({_id:req.id},(err,doc)=>
    {
        if(err)
        {
            res.send({message:"Server Error.. Please try after some time"})
        }
        else{
            if(!doc)
            {
                res.send({message:`User does not exists`})
            }
            else
            {
                console.log({message:"User Exits",username:doc.username})
                res.send({message:"User Exits",username:doc.username})
            }

        }
    })
  }      
}

module.exports={login,register,userdetail,verify}