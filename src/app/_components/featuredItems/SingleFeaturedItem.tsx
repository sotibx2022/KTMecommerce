import React from 'react'
import LinkComponent from '../linkComponent/LinkComponent'
interface Product {
  title: string,
  description: string,
  data: { 
    imageUrl: string,
    subTitle: string
  }[]
}
const SingleFeaturedItem: React.FC<Product> = ({ title, description, data }) => {
  return (
    <section className='bg-helper p-4 w-[250px] flex-col shadow-primaryDark rounded-md'>
      <div className="sectionHeading mb-1">
        <h2 className='secondaryHeading'>{title}</h2>
        <p className='primaryParagraph'>{description}</p>
      </div>
      <div className='flex flex-wrap gap-4 justify-between'>
        {data.map((singleData, index) => (
          <div key={index} className='w-full'>
            {/* <img 
              src={singleData.imageUrl} 
              className='shadow-primaryLight w-[250px] max-h-[100px] object-contain' 
            /> */}
            <div className='bg-primaryDark text-background text-center'>
              <LinkComponent href={`/catalog/keyword=${singleData.subTitle}`} text={singleData.subTitle} />
            </div>
          </div> // Close div that wraps each item
        ))}
      </div>
    </section>
  )
}
export default SingleFeaturedItem
