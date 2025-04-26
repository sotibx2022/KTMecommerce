"use client"
const ShippingAddress = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Address</h2>
      <div>
        <label className="block text-sm font-medium text-primaryDark mb-1">Street Address*</label>
        <input
          type="text"
          name="address"
          className="formItem"
          placeholder="Kalyanpur-5, bharatpur, chitawan"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">City*</label>
          <input
            type="text"
            name="city"
            className="formItem"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">State/Province*</label>
          <input
            type="text"
            name="state"
            className="formItem"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Postal Code*</label>
          <input
            type="text"
            name="postalCode"
            className="formItem"
          />
        </div>
      </div>
    </div>
  )
}
export default ShippingAddress