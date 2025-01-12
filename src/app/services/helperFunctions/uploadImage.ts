import path from "node:path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import cloudinary from "@/config/cloudinaryConfig";
export const uploadImage = async (
  file: File,
  folderName: string,
  fileType: string,
  fullName: string
) => {
  const fileName = `${fullName}profilePicture.${fileType.split('/')[1]}`; // Append file extension
  const tempDir = path.resolve(
    "C:/Users/1/Desktop/KTMecommerce/public/assets/uploads",
    folderName
  );
  const filePath = path.join(tempDir, fileName);
  try {
    // Ensure the temporary directory exists
    if (!fs.existsSync(tempDir)) {
      await fsPromises.mkdir(tempDir, { recursive: true });
    }
    // Convert the file to a buffer and save it temporarily
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fsPromises.writeFile(filePath, buffer);
  } catch (fileSaveError) {
    console.error("Error saving file:", fileSaveError);
    return {
      message: "There was an issue saving the file.",
      status: 500,
      success: false,
    };
  }
  try {
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      use_filename: true, // Use the provided filename in Cloudinary
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
    await fsPromises.unlink(filePath);
    await fsPromises.rm(tempDir, { recursive: true });
    // Return success response with image URL
    return {
      message: "File uploaded successfully.",
      status: 200,
      success: true,
      profileUrl: imageURL,
    };
  } catch (uploadError) {
    console.error("Error during file upload:", uploadError);
    // Attempt to clean up temporary files even on upload error
    try {
      if (fs.existsSync(filePath)) {
        await fsPromises.unlink(filePath);
      }
      if (fs.existsSync(tempDir)) {
        await fsPromises.rm(tempDir, { recursive: true });
      }
    } catch (cleanupError) {
      console.error("Error during cleanup:", cleanupError);
    }
    return {
      message: "There was an issue uploading the file.",
      status: 500,
      success: false,
    };
  }
};
