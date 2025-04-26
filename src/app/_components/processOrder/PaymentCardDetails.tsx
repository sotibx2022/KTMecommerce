"use client"
import { useState } from 'react'
import PaymentCardDesign from './PaymentCardDesign'
const PaymentCardDetails = () => {
  const [showBack, setShowBack] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  })
  // Format card number with hyphens
  const formatCardNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1-')
  }
  // Format expiry date (MM/YY)
  const formatExpiry = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly
      .slice(0, 4)
      .replace(/^(\d{2})/, '$1/')
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'cardNumber') {
      setCardData(prev => ({ ...prev, [name]: formatCardNumber(value) }))
    } 
    else if (name === 'expiry') {
      setCardData(prev => ({ ...prev, [name]: formatExpiry(value) }))
    }
    else if (name === 'cardName') {
      setCardData(prev => ({ ...prev, [name]: value.toUpperCase() }))
    } 
    else {
      setCardData(prev => ({ ...prev, [name]: value }))
    }
  }
  return (
    <div>
      {/* Card Design Display */}
      <PaymentCardDesign
        cardNumber={cardData.cardNumber}
        cardName={cardData.cardName}
        expiry={cardData.expiry}
        cvv={cardData.cvv}
        showBack={showBack}
      />
      {/* Form Inputs */}
      <div className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="4242-4242-4242-4242"
            className="formItem"
            value={cardData.cardNumber}
            onChange={handleInputChange}
            maxLength={19}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Cardholder Name</label>
          <input
            type="text"
            name="cardName"
            placeholder="JOHN DOE"
            className="formItem"
            value={cardData.cardName}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primaryDark mb-1">Expiry Date</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              className="formItem"
              value={cardData.expiry}
              onChange={handleInputChange}
              maxLength={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primaryDark mb-1">CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="123"
              className="formItem w-24"
              value={cardData.cvv}
              onChange={handleInputChange}
              onFocus={() => setShowBack(true)}
              onBlur={() => setShowBack(false)}
              maxLength={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default PaymentCardDetails