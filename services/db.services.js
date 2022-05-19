const mongoose=require("mongoose")
const connectToDB=(url)=>{
mongoose.connect(url,{
        useNewUrlParser: true })   
 .then(() => console.log("Database connected!"))
 .catch(err => 
        {console.log(err)
                console.log("hi")
        })
}
module.exports={connectToDB}