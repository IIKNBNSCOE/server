const crypto=require("crypto")
const ticketmodel=require("../model/ticketmodel")
const usermodel=require("../model/usermodel")
/*** Get All Tickets */
const alltickets=(req,res,next)=>
{
    let it,obj
    let arr=[]
    if(req.b==true)
    {
        ticketmodel.find({},(err,doc)=>
        {
            if(err)
            {
                res.send({message:"Server Error"})
            }
            else{
                let doc1=[]
                if(!doc)
                {
                    res.send({message:"No Tickets Found"})
                }
                else
                {
                  //
                  doc1=doc.map((item) =>{
                      let j=item.toObject()
                      return j
                  })
                //  console.log((doc1))
                  res.send(doc1)         
                }
            }
        })
    }
}     


/*** Create Ticket */
const createticket=(req,res,next)=>          
{
    if(req.b==true)
    {
   
        crypto.randomInt(0, 10000000, (err, n) => {
            if (err) 
            throw err;
            else
            {
            console.log(n);
         
       var tmodel=new ticketmodel({
        ticket_no:n,
        ticket_desc:req.body.ticket_desc,
        user_id:req.id  
       })
       tmodel.save((err,doc)=>
       {
          if(err) 
          {
              res.status(500).send({message:"Ticket is not created"})
          }
          else{
              const cdate=new Date(doc.createdAt)
              const udate=new Date(doc.updatedAt)
              let cd=cdate.getDate()+"-"+cdate.getMonth()+"-"+cdate.getFullYear()+" "+cdate.getHours()+"HH:"+cdate.getMinutes()+"MM:"+cdate.getSeconds()+"SS"
              let ud=udate.getDate()+"-"+udate.getMonth()+"-"+udate.getFullYear()+" "+udate.getHours()+"HH:"+udate.getMinutes()+"MM:"+udate.getSeconds()+"SS"
              console.log(doc)
              res.status(200).send({message:"Ticket is generated",Ticket_no:n})
          }
       })
    }
    })
}        
}

/*** Update Ticket */
const updateticket=(req,res,next)=>
{
    if(req.b==true && req.bb==true)
    {
        console.log(req.params.id)
        console.log(req.body.ticket_desc)
        ticketmodel.findOneAndUpdate({ticket_no:req.params.id},{ticket_desc:req.body.ticket_desc},(err,doc)=>
        {
          if(err) 
          {
              res.status(500).json({message:"Server Error"})
          }
          else{
              console.log(doc)
              res.status(200).json({message:"Ticket updated"})
          }

        })
    }
    else
    {
        res.json({message:"You are not allowed to update this Ticket"})
    }
}

/*** Delete Ticket */
const deleteticket=(req,res,next)=>
{
   if(req.b==true && req.bb==true)
    {        
        ticketmodel.deleteOne({ticket_no:req.params.id},()=>
        {
           console.log(req.params.id)
            res.json({message:"Ticket is Deleted"})
        })
    }
    else
    {
        res.json({message:"You are not allowed to delete this Ticket"})
    }
}
module.exports={alltickets,createticket,updateticket,deleteticket}