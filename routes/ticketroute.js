const express=require("express")
const {alltickets,createticket,updateticket,deleteticket}=require("../controller/ticketcontroller")
const {authentication,authorization}=require("../auth/authentication")
const router=express.Router()
router.get("/",authentication,alltickets)
router.post("/",authentication,createticket)
router.put("/:id",authentication,authorization,updateticket)
router.delete("/:id",authentication,authorization,deleteticket)

module.exports=router