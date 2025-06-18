import React, { useContext } from 'react'
import { SearchContext } from './AdvanceSearchContext'
const PriceSelection = () => {
  const { searchValues } = useContext(SearchContext)
  return (
    <div>
      Price Order: {searchValues.priceOrder}
    </div>
  )
}
export default PriceSelection