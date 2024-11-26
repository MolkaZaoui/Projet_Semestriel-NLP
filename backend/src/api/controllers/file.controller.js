import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config
cloudinary.config({ 
    cloud_name: 'dlh2rz804', 
    api_key: '685772532956183', 
    api_secret: 'VAxP_fVYzrADCQu6yQ_AXQLsO-Y'
});

// Upload PDF function
export const uploadPDF = (file) => {
    return new Promise((resolve, reject) => {
        // Upload the file to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            { 
                resource_type: 'raw', 
                public_id: `cv_${Date.now()}_${file.originalname}`, // Use original name or a custom name
                upload_preset: 'cvupload'
            },
            (error, pdf) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    reject(error);
                } else {
                    resolve(pdf);
                }
            }
        );

        // Pass the file buffer to Cloudinary
        uploadStream.end(file.buffer); // 'file' should be the buffer from multer memory storage
    });
};
