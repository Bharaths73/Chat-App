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

    

    switch (file.mimetype) {
        case 'application/pdf':
          options.resource_type = 'raw'; // PDF files as raw
          break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // Word docx
          options.resource_type = 'raw'; // Word files as raw
          break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': // Excel xlsx
          options.resource_type = 'raw'; // Excel files as raw
          break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': // PowerPoint pptx
          options.resource_type = 'raw'; // PowerPoint files as raw
          break;
        default:
          options.resource_type = 'auto'; // For other files (e.g., images, videos)
      }

    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

exports.deleteImageFromCloudinary = async (image_id) => {
    try {
        return await cloudinary.uploader.destroy(image_id);
    } catch (error) {
        throw new Error("Failed to delete image from Cloudinary");
    }
};