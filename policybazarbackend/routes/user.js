var express = require('express');
var router = express.Router();
var user = require('./user_model');

// Insert data for customer login
router.post('/insert', function(req, res) {
    console.log(req.body)
    const User = new user(req.body);
    User.save(err =>{
        if(err){
            res.send(err)
        }else{
            res.send({message:"Successfully Inserted"})
        }
    })
});


router.get('/login', function(req, res, next) {
    const{email, password }= req.body;
    user.findOne({email:email},(err,user)=>{
   if(user){
   if(password){
     res.send({message:"login Successfully",data:user})
   }
       else{
           res.send({message:"password didnt match"})
       }
   }else{
       res.send({message:"incorrect username or password"})
   }
       })
     });

     router.get("/display", function (req, res) {
        user.find({},function (err, data) {
             if (err) {
               res.status(500).json({ status: false, message: err });
             } else {
               res.status(200).json({ status: true, data, message: "Above Data is available" });
               console.log(data)
             }
           })
         });


module.exports = router;
