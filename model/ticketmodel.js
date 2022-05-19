const mongoose=require('mongoose')
const moment = require('moment-timezone')

const dateindia = moment.tz(Date.now(), "Asia/Kolkata");
//console.log(dateindia);
const ticketschema=new mongoose.Schema({
    ticket_no:{
        type:Number,
        required:true
    },
       ticket_desc:{
        type:String,
        required:true,            
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
   // created_date: {type: Date, default: dateindia},
   // updated_date: {type: Date, default: dateindia}
    
},{collection:"ticket",timestamps:true})
module.exports=mongoose.model("ticket",ticketschema)