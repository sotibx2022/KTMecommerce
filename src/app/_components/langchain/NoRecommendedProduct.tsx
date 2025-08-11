import React from 'react'
import NoData from '../noData/NoData'
import { EqualNot } from 'lucide-react'
const NoRecommendedProduct = () => {
  return (
    <div>
      <NoData
        icon={<EqualNot />}
        notFoundMessage="No recommended products available at the moment.Please refine your search for valid categories."
      />
    </div>
  )
}
export default NoRecommendedProduct
