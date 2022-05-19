const express=require("express")
const controller=require("../controller/usercontroller")
const {authentication}=require("../auth/authentication")
const router=express.Router()
router.post("/login",controller.login)
router.post("/register",controller.register)
router.get("/verify",authentication,controller.verify)
//router.get("/:id",authentication,controller.userdetail)

module.exports=router