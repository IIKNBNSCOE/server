const express=require('express')
const dotenv=require('dotenv')
const cors = require('cors')
const mdb=require('./services/db.services')
const app=express()
app.use(cors())
app.use(express.json())
const urouter=require('./routes/userroute')
const trouter=require('./routes/ticketroute')
dotenv.config()

mdb.connectToDB(process.env.MONGODB_URL)
app.use('/user',urouter)
app.use('/ticket',trouter)
app.listen(process.env.PORT||7000,(req,res)=>
{
    console.log("Server started at port 7000 , You may connect")
})