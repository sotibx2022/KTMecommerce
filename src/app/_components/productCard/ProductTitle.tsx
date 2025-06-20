import { Badge } from '@/components/ui/badge';
import React from 'react'
interface ProductTitleProps{
    productName:String,
    productHighlight:{
        isNewArrivals?:boolean,
    isTrendingNow?:boolean,
    isTopSell?:boolean,
    isOfferItem?:boolean,
    }
}
const ProductTitle:React.FC<ProductTitleProps> = ({productName,productHighlight}) => {
    const {isTrendingNow,isTopSell,isOfferItem,isNewArrivals} = productHighlight;
  return (
    <div className="relative mb-4"
              style={{ background: "var(--gradientwithOpacity)" }}>
                <h2 className="subHeading">{productName}</h2>
                <span className="productBadge absolute bottom-100 right-0">
                   {<Badge variant={isNewArrivals?"default":isTrendingNow?"destructive":isTopSell?"helper":isOfferItem?"outline":"secondary"}>{isNewArrivals?"New":isTrendingNow?"Trending":isTopSell?"top":isOfferItem?"Offer":"Regular"}</Badge>}
                </span>
              </div>
  )
}
export default ProductTitle