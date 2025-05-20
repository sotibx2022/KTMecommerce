"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';
const DirectContactDetails = () => {
  const contactItems = [
    {
      type: "phone",
      value: "00977-9864890402",
      link: "tel:+9779864890402",
      icon: faPhone
    },
    {
      type: "email",
      value: "info@ecommercektm.com",
      link: "mailto:info@ecommercektm.com",
      icon: faEnvelope
    },
    {
      type: "location",
      value: "Bharatpur-05, Kalyanpur, Chitwan",
      link: "https://maps.google.com/?q=Bharatpur-05,Kalyanpur,Chitwan",
      icon: faMapMarkerAlt
    },
  ];
  return (
    <div className="container text-background">
      <div className="flex flex-wrap justify-between gap-6">
        {contactItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="p-3 rounded-full  color-primaryLight">
              <FontAwesomeIcon 
                icon={item.icon} 
                className="text-xl color-primaryDark" 
              />
            </div>
            <div className="flex-1">
              <a 
                href={item.link} 
                className="text-primaryParagraph hover:color-primaryDark transition-colors"
                target={item.type === "email" || item.type === "phone" ? "_self" : "_blank"}
                rel="noopener noreferrer"
              >
                {item.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DirectContactDetails;