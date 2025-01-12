# Steps to Upload an Image to Cloudinary
1. **Create Async Function**  
   - Accept `file`, `folderName`, `fileType`, and `fullName` as parameters.
2. **Generate File Name**  
   - Combine `fullName` and a suffix (e.g., `profilePicture`) to create a custom `fileName`.
3. **Set Temp Directory**  
   - Use `path.resolve` to define `tempDir` with the folder path and `folderName`.
4. **Create File Path**  
   - Use `path.join` to combine `tempDir` and `fileName` for the full file path.
5. **Ensure TempDir Exists**  
   - Use `fsPromises.mkdir(tempDir, { recursive: true })` to create the directory if it doesn’t exist.  
   - **What does recursive: true mean?**  
     Ensures that intermediate directories in the path are created if they don’t already exist.
6. **Convert File to ArrayBuffer**  
   - Read the file as an `ArrayBuffer` to access raw binary data for further processing.
7. **Convert ArrayBuffer to Buffer**  
   - Transform the `ArrayBuffer` into a `Buffer`, as Node.js works with `Buffer` objects for binary data.
8. **Write File to Disk**  
   - Save the `Buffer` to the file path using `fsPromises.writeFile(filePath, buffer)`.
9. **Upload to Cloudinary**  
   - Pass `filePath`, `fileName`, `folder`, and `resource_type` to Cloudinary’s upload function.
10. **Cleanup File & Folder**  
    - Use `fsPromises.unlink(filePath)` to delete the file.
    - Use `fsPromises.rm(tempDir, { recursive: true })` to remove the folder.  
    - **What does recursive: true mean?**  
      Deletes the folder and all its contents, including subdirectories.
11. **Handle Errors**  
    - On upload failure, ensure file and folder cleanup by checking their existence before deletion.
