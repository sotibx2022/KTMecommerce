"use client"
const OrderTerms = () => {
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          name="agreeTerms"
          className="mt-1 h-5 w-5 text-primaryDark"
        />
        <span className="text-primaryDark">
          I agree to the terms and conditions of our e-commerce website and confirm that my personal data will be processed in accordance with the privacy policy.
        </span>
      </label>
    </div>
  )
}
export default OrderTerms