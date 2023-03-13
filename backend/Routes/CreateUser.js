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
const { body, validationResult } = require('express-validator');
router.post('/CreateUser', [body('email', 'incorrect email id').isEmail(), body('name').isLength({ min: 5 }), body('password', 'incorrect Password').isLength({ min: 5 })], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      await User.create({
         name: req.body.name,
         password: req.body.password,
         email: req.body.email,
         location: req.body.location
      })
      res.json({ success: true });
   } catch (error) {
      console.log(error)
      res.json({ success: false });
   }
})
router.post('/loginUser', [body('email').isEmail(), body('password', 'incorrect Password').isLength({ min: 5 })], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   let email = req.body.email;
   try {
      let useremail = await User.findOne({ email });
      if (!useremail) {
         return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }

      if (req.body.password !== useremail.password) {
         return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }
      return res.json({ success: true })

   } catch (error) {
      console.log(error)
      res.json({ success: false });
   }
})

module.exports = router;