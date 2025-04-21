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
    const handleShare=(mediaName:string)=>{
        const shareUrl = encodeURIComponent(`${config.websiteUrl}/singleProduct/id:${productId}&,slug:${productSlug}`);
        let shareLink=""
        switch(mediaName){
            case "facebook":
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
                break;
                case "instagram":
                    shareLink="";
                    break;
                case "whatsapp":
                    shareLink=`https://wa.me/?text=${shareUrl}`;
                    break;
                case "twitter":
                    shareLink= `https://twitter.com/intent/tweet?url=${shareUrl}&text=Check this out!`;
                    break;
                default:
                    return
        }
        window.open(shareLink, "_blank", "noopener,noreferrer");
    }
    return (
        <div className='mt-2'>
            <div className="flex items-center justify-start space-x-6">
                <FontAwesomeIcon icon={faFacebookSquare} size="2x" className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200" onClick={()=>handleShare("facebook")} />
                <FontAwesomeIcon icon={faTwitterSquare} size="2x" className='cursor-pointer text-blue-400 hover:text-blue-600 transition-colors duration-200' onClick={()=>handleShare("twitter")} />
                <FontAwesomeIcon icon={faInstagram} size="2x" className='cursor-pointer text-pink-500 hover:text-pink-700 transition-colors duration-200' onClick={()=>handleShare("instagram")} />
                <FontAwesomeIcon icon={faWhatsappSquare} size="2x" className="cursor-pointer text-green-500 hover:text-green-700 transition-colors duration-200" onClick={()=>handleShare("whatsapp")}/>
            </div>
        </div>
    );
};
export default SocialMediaSharing;