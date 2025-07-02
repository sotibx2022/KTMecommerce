import React from 'react'
import UpdatePassword from './DashboardSettingComponents/UpdatePassword'
import UpdateDeliveryDetails from './DashboardSettingComponents/UpdateDeliveryDetails'
const page = () => {
  return (
    <div>
      <UpdateDeliveryDetails/>
      <UpdatePassword/>
    </div>
  )
}
export default page