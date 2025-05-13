import React from 'react';
import "../loadingComponent/loading.css"
const LoadingContainer = () => {
  return (
    <div className="loaderWrapper bg-transparent flex-center z-10">
      <div className="cssload-thecube bg-transparent">
      <div className="cssload-cube cssload-c1"></div>
      <div className="cssload-cube cssload-c2"></div>
      <div className="cssload-cube cssload-c3"></div>
      <div className="cssload-cube cssload-c4"></div>
    </div>
    </div>
  );
}
export default LoadingContainer;