"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
interface ImageUploadProps {
  action: "add" | "edit";
  imageUrl?: string;
  text?: string;
  uploadImage: (file: File) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ action, imageUrl, text, uploadImage }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setUploadedImage(URL.createObjectURL(selectedFile));
      uploadImage(selectedFile)
    }
  };
  const handleRemoveImageUpload = () => {
    setFile(null);
    setUploadedImage("");
  };
  // Default text to "Product" if none provided
  const displayText = text || "Product";
  return (
    <div className="md:w-1/2 card">
      <Card className='card'>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{displayText} Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full">
            <label
              className={`flex flex-col w-full border-2 border-dashed rounded-lg cursor-pointer p-6 gap-4 `}
            >
              {action === 'edit' && imageUrl && (
                <div className="mb-4 space-y-2">
                  <Label className="text-sm font-medium text-primaryDark">
                    Current {displayText} Image
                  </Label>
                  <img
                    src={imageUrl}
                    alt={`${displayText} from database`}
                    className="mt-1 max-h-32 object-contain rounded-md"
                  />
                </div>
              )}
              {/* Newly Uploaded Image */}
              {uploadedImage ? (
                <div className="mb-4 space-y-2 relative">
                  <Label className="text-sm font-medium text-primaryDark flex justify-between items-center">
                    New Upload Preview
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={handleRemoveImageUpload}
                      className="cursor-pointer"
                    />
                  </Label>
                  <img
                    src={uploadedImage}
                    alt={`New ${displayText} upload preview`}
                    className="mt-1 max-h-32 object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Upload {displayText} Image</Label>
                  <p className="text-xs text-muted-foreground">PNG, JPG, JPEG up to 5MB</p>
                </div>
              )}
              <Input
                id="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ImageUpload;
