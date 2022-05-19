/*** Authentication Middleware */
const jwt=require("jsonwebtoken")
const usermodel=require('../model/usermodel')
const ticketmodel=require("../model/ticketmodel")
const authentication=(req,res,next)=>
{   
   const token=req.headers.authorization
   console.log(req.params.id)
   if(!token)
   {
      res.status(403).send({messsage:"Unauthenticated Access"})
   }
   else
   {
   try
   {
       const _id=jwt.verify(token,process.env.JWT_SECRET_KEY)
       req.id=_id.id
       console.log("in authentication "+req.id)
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
                  req.b=false                  
                  res.send({message:"Unauthenticated Access"})
                  next()
              }
              else
              {
                 req.b=true  
                 next()                         
              }         
          }
      })   
   }
   catch(err)
   {
       req.flag=true
       res.status(403).send({messsage:"Unauthenticated Access,Token Expired"}) 
       next()
   }
}
}

/*** Authorization Middleware */
const authorization=(req,res,next)=>
{
    console.log(req.params.id)
    if(!req.flag)
    {
    ticketmodel.findOne({ticket_no:req.params.id},(err,doc)=>
    {
        if(err)
        {
            res.send({message:"Server Error.. Please try after some time"})
            next()
        }
        else
        {
            
            console.log(doc.user_id+" mmm")
            console.log(req.id)
            if(req.id == doc.user_id)
            {
                console.log("hi")
                req.bb=true
                next()
            }
            else
            {
               // console.log("hello")
              //  res.status(400).json({message:"Unauthorized Access"}) 
                req.bb=false
                next()              
            }
            
        }
    })
}
}
module.exports={authentication,authorization}