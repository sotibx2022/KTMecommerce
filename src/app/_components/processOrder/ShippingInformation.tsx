"use client"
const ShippingInformation = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primaryDark">First Name*</label>
          <input
            type="text"
            name="firstName"
            className="formItem"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Last Name*</label>
          <input
            type="text"
            name="lastName"
            className="formItem"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Email*</label>
          <input
            type="email"
            name="email"
            className="formItem"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Phone Number*</label>
          <input
            type="tel"
            name="phone"
            className="formItem"
          />
        </div>
      </div>
    </div>
  )
}
export default ShippingInformation