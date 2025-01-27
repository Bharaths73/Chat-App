const express=require('express');
const router=express.Router();
const {login}=require('../controllers/Auth');
const {signUp}=require('../controllers/Auth');

router.post('/login',login);
router.post('/signup',signUp);

module.exports=router;