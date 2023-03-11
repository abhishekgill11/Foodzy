const express = require('express')
const router = express.Router()
const User = require('../models/User')
router.use(express.json());
// router.post('/createuser', async (req, res)=>{
//     try {
//        if (!req.body) {
//            throw new Error('Request body is missing');
//        }
//        await User.create({
//            name:req.body.name,
//            password:req.body.password,
//            email:req.body.email,
//            location:req.body.location
//        })
//        res.json({success:true});
//     } catch (error) {
//        console.log(error)
//        res.json({success:false});
//     }
// })
// module.exports = router;

router.post('/createuser', async (req, res)=>{
     try {
       await User.create({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          location: req.body.location
        })
        res.json({success:true});
     } catch (error) {
        console.log(error)
        res.json({success:false});
     }
})
module.exports = router;