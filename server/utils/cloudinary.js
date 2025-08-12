import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Helper function to extract public_id from Cloudinary URL
export const extractPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }
  
  try {
    // Cloudinary URL format: https://res.cloudinary.com/[cloud_name]/image/upload/v[version]/[folder]/[public_id].[format]
    // or: https://res.cloudinary.com/[cloud_name]/image/upload/[folder]/[public_id].[format]
    
    const urlParts = url.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload'
    const pathAfterUpload = urlParts.slice(uploadIndex + 1);
    
    // Remove version if present (starts with 'v' followed by numbers)
    let pathWithoutVersion = pathAfterUpload;
    if (pathAfterUpload[0] && pathAfterUpload[0].match(/^v\d+$/)) {
      pathWithoutVersion = pathAfterUpload.slice(1);
    }
    
    // Join folder path and filename, then remove extension
    const fullPath = pathWithoutVersion.join('/');
    const lastDotIndex = fullPath.lastIndexOf('.');
    
    if (lastDotIndex !== -1) {
      return fullPath.substring(0, lastDotIndex);
    }
    
    return fullPath;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
};

export default cloudinary;
