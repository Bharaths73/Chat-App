const cloudinary=require('cloudinary').v2
require('dotenv').config();

exports.uploadImageToCloudinary=async(file,folder,height,quality)=>{
    const options={folder};
    if(height){
        options.height=height
    }
    if(quality){
        options.quality=quality
    }

  options.resource_type = 'auto';
  console.log("file path is ",file," space ",file.tempFilePath);
      
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.deleteImageFromCloudinary = async (image_id) => {
    try {
        return await cloudinary.uploader.destroy(image_id);
    } catch (error) {
        throw new Error("Failed to delete image from Cloudinary");
    }
};