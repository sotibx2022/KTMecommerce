import { Badge } from '@/components/ui/badge';
import React from 'react';
interface ProductTitleProps {
  productName: string;
  productHighlight: {
    isNewArrivals?: boolean;
    isTrendingNow?: boolean;
    isTopSell?: boolean;
    isOfferItem?: boolean;
  };
}
const ProductTitle: React.FC<ProductTitleProps> = ({ productName, productHighlight }) => {
  const { isTrendingNow, isTopSell, isOfferItem, isNewArrivals } = productHighlight;
  // Determine badge properties based on product highlight
  const getBadgeProps = () => {
    if (isNewArrivals) return { variant: 'default', text: 'New',  };
    if (isTrendingNow) return { variant: 'destructive', text: 'Trend',  };
    if (isTopSell) return { variant: 'helper', text: 'Top', };
    if (isOfferItem) return { variant: 'outline', text: 'Offer',  };
    return { variant: 'secondary', text: 'Regular',  };
  };
  const badgeProps = getBadgeProps();
  return (
    <div className="relative mb-1 p-2">
      <h2 className="secondaryHeading">{productName}</h2>
      <div className="absolute -top-3 -right-3">
        <Badge 
          variant={badgeProps.variant as any} 
          className={`px-3 pl-1  text-sm font-medium  shadow-md`}
        >
          {badgeProps.text}
        </Badge>
      </div>
    </div>
  );
};
export default ProductTitle;