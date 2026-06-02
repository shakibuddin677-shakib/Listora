const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {   
    return {
      folder: 'wanderlust_Dev',
      allowed_formats: ['png', 'jpg', 'jpeg'],  // ✅ allowedFormats → allowed_formats
      transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // optional
    };
  },
});

module.exports = {
    cloudinary,
    storage
};