const { render } = require('ejs')
var express=require('express')
var router=express.Router()
var foodpool=require('./foodpool')
var upload=require('./foodmulter')
var LocalStorage=require('node-localstorage').LocalStorage
localStorage= new LocalStorage('./scratch')


/*interface for food */
router.get('/food',function(req,res){

  try{
   var admin=localStorage.getItem('FADMIN')
console.log(admin)
if(admin)
    res.render('hotel_interface',{status:-1,message:''})
    else
    res.render('food_login',{message:''})
   }
   catch(e)
   {
      res.render('food_login',{message:''})
   }

 })

 router.get('/fetch_all_foodtype',function(req,res){

    foodpool.query("select * from foodtype",function(error,result)
    {
 
       if(error)
       {res.status(500).json([])}
       else
       {
          res.status(200).json(result)
       }
 
 
 
    })
  })
 
  
router.get('/fetch_all_fooditem',function(req,res){

foodpool.query("select * from fooditem  where foodid=?",[req.query.foodid],function(error,result)
{
 
       if(error)
       {res.status(500).json([])}
       else
       {
          res.status(200).json(result)
       }
 
 
 
    })
  })

  router.post('/submit_food_details',upload.single('picture'),function(req,res){

   foodpool.query("insert into fooddetails (foodid,fooditemid,status1,status2,discription,price,offer,picture)values(?,?,?,?,?,?,?,?)",[req.body.foodid,req.body.fooditemid,req.body.status1,req.body.status2,req.body.discription,req.body.price,req.body.offer,req.file.originalname],function(error,result){

      
      if(error)
     
      {
         res.render('hotel_interface',{status:0,message:'server error.....'})
      }


      else 
      {
         res.render('hotel_interface',{status:1,message:'Record submited sucessesfuly.....'})
      }


   })
 })

 router.get('/display_picture',function(req,res){

   res.render('display_picture',{data:req.query})

})


router.post('/edit_picture',upload.single('picture'),function(req,res){

   foodpool.query("update fooddetails set picture=? where dishid=?",[req.file.originalname,req.body.dishid],function(error,result){

      if(error)
      
      {
         res.redirect('/foodproject/fetch_all_food')
      }


      else 
      {
         res.redirect('/foodproject/fetch_all_food')      
      }



   })
 })


 router.get('/fetch_all_food',function(req,res){

   try{
      var admin=localStorage.getItem('FADMIN')
   
   if(!admin)
   {res.render('food_login',{message:''})}}

 catch(e)
      {
         res.render('food_login',{message:''})
      }

   foodpool.query("select fd.*,(select fi.foodname from fooditem fi where fi.fooditemid=fd.fooditemid) as fooditem,(select ft.foodtype from foodtype ft where ft.foodid=fd.foodid)as foodtype from fooddetails as fd",function(error,result){
   
         if(error)
         {res.render('displayallfood',{data:[]})}
         else
         /*console.log(result)*/
         {res.render('displayallfood',{data:result})}
   
   
      })
    })

    router.get('/edit_food_data',function(req,res){

      foodpool.query("select fd.*,(select fi.foodname from fooditem fi where fi.fooditemid=fd.fooditemid) as fooditem,(select ft.foodtype from foodtype ft where ft.foodid=fd.foodid)as foodtype from fooddetails as fd where fd.dishid=?",[req.query.dishid],function(error,result){
      
            if(error)
            {res.render('food_display_byid',{data:[]})}
            else
            /*console.log(result)*/
            {res.render('food_display_byid',{data:result[0]})}
   
      
         })
       })
    
   
       router.post('/edit_food_details',function(req,res){

         if(req.body.btn=='Edit')
         {
         foodpool.query("update  fooddetails set foodtypeid=?,fooditemid=?,status1=?,status2=?,discription=?,price=?,offer=? where dishid=?",[req.body.foodtypeid,req.body.fooditemid,req.body.status1,req.body.status2,req.body.discription,req.body.price,req.body.offer,req.body.dishid],function(error,result){
      
            
            if(error)
           
            {
               res.redirect('/foodproject/fetch_all_food')
            }
      
      
            else 
            {
               res.redirect('/foodproject/fetch_all_food')           
             }
      
      
         })
      }

      else{
         foodpool.query("delete from  fooddetails  where dishid=?",[req.body.dishid],function(error,result){
      
            
            if(error)
           
            {
               res.redirect('/foodproject/fetch_all_food')
            }
      
      
            else 
            {
               res.redirect('/foodproject/fetch_all_food')           
             }
      
      
         })
      }
       })
      
module.exports=router