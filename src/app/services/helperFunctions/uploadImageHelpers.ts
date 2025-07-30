export const getPublicId = (url: string):string| null => {
    const matches = url.match(/upload\/(?:v\d+\/)?(.+?)\.\w+$/);
    return matches ? matches[1] : null;
}
import cloudinary from '@/config/cloudinaryConfig';
import { symlink } from 'fs';
export const deleteCloudinaryImage = async (publicId: string): Promise<boolean> => {
    try {
        if (!publicId) {
            console.error('No publicId provided for deletion');
            return false;
        }
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === 'ok';
    } catch (error) {
        console.error('Error deleting Cloudinary image:', {
            publicId,
            error: error instanceof Error ? error.message : error
        });
        return false;
    }
};