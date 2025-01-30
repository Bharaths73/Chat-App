const express=require('express');
const { auth } = require('../middlewares/auth');
const { getMessages, uploadFile } = require('../controllers/Messages');
const router=express.Router();

router.get('/get-messages/:id',auth,getMessages);
router.post('/upload-file',auth,uploadFile)

module.exports=router;