const express=require('express');
const { auth } = require('../middlewares/auth');
const { searchContacts } = require('../controllers/Contacts');
const router=express.Router();

router.post('/search-contacts',auth,searchContacts)

module.exports=router;