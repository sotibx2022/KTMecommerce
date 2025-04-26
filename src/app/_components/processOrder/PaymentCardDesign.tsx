"use client"
interface PaymentCardDesignProps {
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
  showBack: boolean
}
const PaymentCardDesign = ({ 
  cardNumber, 
  cardName, 
  expiry, 
  cvv, 
  showBack 
}: PaymentCardDesignProps) => {
  // Chip design with 4 segments
  const Chip = () => (
    <div className="flex justify-between flex-wrap w-[32px] h-[34px]">
      <div className="w-[15px] h-[15px] bg-helper rounded-sm"></div>
      <div className="w-[15px] h-[15px] bg-helper rounded-sm"></div>
      <div className="w-[15px] h-[15px] bg-helper rounded-sm"></div>
      <div className="w-[15px] h-[15px] bg-helper rounded-sm"></div>
    </div>
  )
  return (
    <div className="space-y-6">
      {/* Front Side of Card */}
      <div 
        className={`relative rounded-xl p-6 text-background w-full max-w-[400px] shadow-helper ${showBack ? 'hidden' : 'block'}`} 
        style={{ background: "var(--gradientwithOpacity)" }}
      >
        <div className="flex justify-between items-start mb-8">
          <Chip />
          <div className="text-lg text-helper font-extrabold">VISA</div>
        </div>
        <div className="mb-6 min-h-[28px]">
          <div className="w-full border-b border-primaryDark text-primaryDark tracking-[0.2em] text-xl">
            <span className="font-ocr" style={{ letterSpacing: '0.25em' }}>
              {cardNumber || '1111-1111-1111-1111'}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="w-1/2 pr-2">
            <div className="text-xs text-primaryDark opacity-80 mb-1">Card Holder</div>
            <div className="w-full border-b border-primaryDark text-primaryDark uppercase text-sm">
              {cardName || 'YOUR NAME'}
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="text-xs text-primaryDark opacity-80 mb-1">Expires</div>
            <div className="w-full border-b border-primaryDark text-primaryDark text-sm">
              {expiry || 'MM/YY'}
            </div>
          </div>
        </div>
      </div>
      {/* Back Side of Card (CVV) */}
      <div 
        className={`relative rounded-xl shadow-lg p-6 text-background w-full max-w-[400px] ${showBack ? 'block' : 'hidden'}`} 
        style={{ background: "var(--gradientwithOpacity)" }}
      >
        <div className="h-8 bg-primaryDark mt-4"></div>
        <div className="mt-12 flex justify-end items-center">
          <div className="bg-background h-10 w-24 rounded-sm flex items-center justify-center border border-primaryDark">
            <div className="text-primaryDark text-center text-lg">
              {cvv ? '*'.repeat(cvv.length) : '***'}
            </div>
          </div>
          <div className="ml-2 text-xs text-primaryDark">CVV</div>
        </div>
      </div>
    </div>
  )
}
export default PaymentCardDesign