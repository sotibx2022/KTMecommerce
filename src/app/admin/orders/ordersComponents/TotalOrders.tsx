import React from 'react'
import TimeSummaryCard from '../../components/ecommerceSummary/TimeSummaryCard'
const TotalOrders = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 container'>
      <TimeSummaryCard title={'Orders Today'} amount={'12'} trend={'up'} />
      <TimeSummaryCard title={'Orders This Week'} amount={'94'} trend={'down'} />
      <TimeSummaryCard title={'Orders This Month'} amount={'256'} trend={'up'}/>
    </div>
  )
}
export default TotalOrders