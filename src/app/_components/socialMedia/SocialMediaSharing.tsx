import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookSquare,
    faTwitterSquare,
    faInstagram,
    faWhatsappSquare
} from '@fortawesome/free-brands-svg-icons';
import { config } from '@/config/configuration';
import Link from 'next/link';
const SocialMediaSharing = () => {
    const socialMediaLinks = [
        {
            icon: faFacebookSquare,
            url: "facebook.com",
            color: "text-blue-600 hover:text-blue-800",
            label: "Facebook"
        },
        {
            icon: faTwitterSquare,
            url: "twitter.com",
            color: "text-blue-400 hover:text-blue-600",
            label: "Twitter"
        },
        {
            icon: faInstagram,
            url: "instagram.com",
            color: "text-pink-500 hover:text-pink-700",
            label: "Instagram"
        },
        {
            icon: faWhatsappSquare,
            url: "whatsapp.com",
            color: "text-green-500 hover:text-green-700",
            label: "WhatsApp"
        }
    ];
    return (
        <div className='mt-2'>
            <div className="flex items-center justify-start space-x-6">
                {socialMediaLinks.map((social, index) => (
                    <Link
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`cursor-pointer ${social.color} transition-colors duration-200`}
                    >
                        <FontAwesomeIcon icon={social.icon} size="2x" />
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default SocialMediaSharing;