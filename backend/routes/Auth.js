const express=require('express');
const router=express.Router();
const {login, logout}=require('../controllers/Auth');
const {signUp}=require('../controllers/Auth');
const { auth } = require('../middlewares/auth');

router.post('/login',login);
router.post('/signup',signUp);
router.post('/logout',logout);

module.exports=router;