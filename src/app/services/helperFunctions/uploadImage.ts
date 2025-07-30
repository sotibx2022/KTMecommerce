import path from "node:path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import cloudinary from "@/config/cloudinaryConfig";
import { deleteCloudinaryImage } from "./uploadImageHelpers";
// Temporary directory path (adjust for serverless environments)
const TEMP_DIR = process.env.TEMP_DIR || "/tmp"; // `/tmp` for serverless platforms
export const uploadImage = async (
  file: File|Blob,
  folderName: string,
  fileType: string,
  fullName: string,
  publicId?:string,
) => {
  const fileName = `${fullName}profilePicture.${fileType.split('/')[1]}`; // Append file extension
  const tempDir = path.join(TEMP_DIR, folderName); // Use temporary directory path
  const filePath = path.join(tempDir, fileName);
  try {
    if(publicId){
      deleteCloudinaryImage(publicId)
    }
    // Ensure the temporary directory exists
    if (!fs.existsSync(tempDir)) {
      await fsPromises.mkdir(tempDir, { recursive: true });
    }
    // Convert the file to a buffer and save it temporarily
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fsPromises.writeFile(filePath, buffer);
  } catch (fileSaveError) {
    return {
      message: "There was an issue saving the file.",
      status: 500,
      success: false,
    };
  }
  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename: true, // Use the provided filename in Cloudinary
      unique_filename: false, // Avoid generating unique filenames
      folder: folderName, // Dynamic folder name
      resource_type: "image", // Explicitly set as image
    });
    // Check for upload result
    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error("Cloudinary upload failed.");
    }
    const imageURL = uploadResult.secure_url;
    // Clean up temporary file and directory
    await fsPromises.unlink(filePath); // Remove the temporary file
    // Ensure directory is cleaned up only if empty
    try {
      const files = await fsPromises.readdir(tempDir);
      if (files.length === 0) {
        await fsPromises.rm(tempDir, { recursive: true });
      }
    } catch (dirReadError) {
      // Handle directory read error without logging
    }
    // Return success response with image URL
    return {
      message: "File uploaded successfully.",
      status: 200,
      success: true,
      profileUrl: imageURL,
    };
  } catch (uploadError) {
    // Attempt to clean up temporary files even on upload error
    try {
      if (fs.existsSync(filePath)) {
        await fsPromises.unlink(filePath);
      }
      // Ensure directory is cleaned up even if the upload failed
      const files = await fsPromises.readdir(tempDir);
      if (files.length === 0) {
        await fsPromises.rm(tempDir, { recursive: true });
      }
    } catch (cleanupError) {
      // Handle cleanup error without logging
    }
    return {
      message: "There was an issue uploading the file.",
      status: 500,
      success: false,
    };
  }
};
