import React from 'react';
interface IHighLightSelectionProps {
  initialHighLights: {
    isOfferItem?: boolean;
    isTrendingItem?: boolean;
    isNewArrival?: boolean;
    isTopSell?: boolean;
    isRegular?: boolean;
  };
}
const HighLightSelection: React.FC<IHighLightSelectionProps> = ({
 initialHighLights
}) => {
  return (
    <div>
      <div>Offer: {initialHighLights.isOfferItem ? 'Yes' : 'No'}</div>
      <div>Trending: {initialHighLights.isTrendingItem ? 'Yes' : 'No'}</div>
      <div>New Arrival: {initialHighLights.isNewArrival ? 'Yes' : 'No'}</div>
      <div>Top Sell: {initialHighLights.isTopSell ? 'Yes' : 'No'}</div>
    </div>
  );
};
export default HighLightSelection;