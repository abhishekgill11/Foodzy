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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "abhishekabhishekabhishekabhishek"
router.post('/CreateUser', [body('email', 'incorrect email id').isEmail(), body('name').isLength({ min: 5 }), body('password', 'incorrect Password').isLength({ min: 5 })], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const salt = await bcrypt.genSalt(10);
   let secPassword = await bcrypt.hash(req.body.password, salt);
   try {
      await User.create({
         name: req.body.name,
         password: secPassword,
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
      const pwdCompare = await bcrypt.compare(req.body.password, useremail.password)
      if (!pwdCompare) {
         return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }

      const data = {
         user:{
            id:useremail.id
         }
      }
      const authToken = jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken })

   } catch (error) {
      console.log(error)
      res.json({ success: false });
   }
})

module.exports = router;