const express=require('express');
const router=express.Router();
const {updateUserData,updateUserImage, deleteUserImage}=require('../controllers/Profile');
const {auth}=require('../middlewares/auth');

router.put('/update',auth,updateUserData);
router.post('/update-image',auth,updateUserImage);
router.delete('/delete-image',auth,deleteUserImage)

module.exports=router;