const express=require('express');
const { auth } = require('../middlewares/auth');
const { searchContacts, getContactsForDM } = require('../controllers/Contacts');
const router=express.Router();

router.post('/search-contacts',auth,searchContacts)
router.get('/get-contacts',auth,getContactsForDM)
module.exports=router;