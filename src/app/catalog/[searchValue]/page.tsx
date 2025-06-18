import React from 'react'
import AdvanceSearch from './AdvanceSearch'
import AdvanceSearchContext from './AdvanceSearchContext'
const page = () => {
  return (
    <div>
      <AdvanceSearchContext>
      <AdvanceSearch/>
      </AdvanceSearchContext>
    </div>
  )
}
export default page