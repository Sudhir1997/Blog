import express from "express";
let router = express.Router();

router.get('/',(req,res)=>{console.log(req.session);res.render('./../views/homet.ejs')});
router.get('/login',(req,res)=>{console.log(req.session);res.render('./../views/logint.ejs',{value:null})});

router.get('/contact',(req,res)=>{console.log(req.session);res.render('./../views/contactt.ejs')});
router.get('/homeblogs',(req,res)=>{res.render('./../views/blogt.ejs')});

router.get('/logout',(req,res,next)=>{
    if(req.session.userId){
        next(); 
    }
    else{
        res.redirect("/");
    }

},(req,res)=>{req.session.destroy(()=>{res.redirect("/")})});

export default router;
