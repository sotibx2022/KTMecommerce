import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookSquare,
    faTwitterSquare,
    faInstagram,
    faWhatsappSquare
} from '@fortawesome/free-brands-svg-icons';
import { config } from '@/config/configuration';
interface IMediaSharing{
    productId:string,
    productSlug:string
}
const SocialMediaSharing:React.FC<IMediaSharing> = ({productId,productSlug}) => {
    const handleFacebookShare=()=>{
        const shareUrl = encodeURIComponent(`${config.websiteUrl}/singleProduct/id:${productId}&,slug:${productSlug}`);
        const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        window.open(facebookShareLink, "_blank", "noopener,noreferrer");
    }
    return (
        <div className='mt-2'>
            <div className="flex items-center justify-start space-x-6">
                <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200" onClick={handleFacebookShare} />
                <FontAwesomeIcon icon={faTwitterSquare} size="2x" className='cursor-pointer text-blue-400 hover:text-blue-600 transition-colors duration-200' />
                <FontAwesomeIcon icon={faInstagram} size="2x" className='cursor-pointer text-pink-500 hover:text-pink-700 transition-colors duration-200' />
                <FontAwesomeIcon icon={faWhatsappSquare} size="2x" className="cursor-pointer text-green-500 hover:text-green-700 transition-colors duration-200" />
            </div>
        </div>
    );
};
export default SocialMediaSharing;