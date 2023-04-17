const { render } = require('ejs')
var express=require('express')
var router=express.Router()
var foodpool=require('./foodpool')
var LocalStorage=require('node-localstorage').LocalStorage
localStorage= new LocalStorage('./scratch')




router.get('/loginpage',function(req,res){
    try{
        var admin=localStorage.getItem('FADMIN')
     console.log("addddmin",admin)
     if(admin)
     res.render('fooddashboard',{admin:JSON.parse(admin)})
    
         else
         res.render('food_login',{message:''})
        }
        catch(e)
        {
          res.render('food_login',{message:''})
        }
     
    
 })



 router.get('/logout',function(req,res){
    localStorage.clear()
     res.render('food_login',{message:''})
   })


 router.post('/check_foodadmin_login',function(req,res){

    foodpool.query("select * from admins where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
      console.log(error)
        if(error)
        { console.log(error)
            res.render('food_login',{message:'server error...'})
        }
        
        else
        {
        if(result.length==0)
        { 
          console.log(result)
        res.render('food_login',{message:'invalid email/number/password'})
        }

       else
       {
        localStorage.setItem('FADMIN',JSON.stringify(result[0]))
        res.render('fooddashboard',{admin:result[0]})
       }
      }
    
      })


    
    })











module.exports=router