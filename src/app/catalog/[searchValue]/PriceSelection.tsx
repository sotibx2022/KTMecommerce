import React from 'react'
interface IPriceSelectionProps{
    initialPriceOrder:string;
}
const PriceSelection:React.FC<IPriceSelectionProps> = ({initialPriceOrder}) => {
  return (
    <div>{initialPriceOrder}</div>
  )
}
export default PriceSelection