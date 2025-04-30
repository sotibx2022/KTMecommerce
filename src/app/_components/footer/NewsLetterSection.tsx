import React from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import SocialMediaSharing from '../socialMedia/SocialMediaSharing'
const NewsLetterSection = () => {
  return (
    <section className="py-4 bg-primaryLight text-background flex flex-col justify-center items-center">
      <h3 className="text-xl font-bold text-primaryDark">Available In Social Media</h3>
      <SocialMediaSharing/>
  </section>
  )
}
export default NewsLetterSection