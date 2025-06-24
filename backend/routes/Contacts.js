const express=require('express');
const { auth } = require('../middlewares/auth');
const { searchContacts, getContactsForDM, getAllContacts } = require('../controllers/Contacts');
const router=express.Router();

router.post('/search-contacts',auth,searchContacts)
router.get('/get-contacts',auth,getContactsForDM)
router.get('/get-all-contacts',auth,getAllContacts)
module.exports=router;