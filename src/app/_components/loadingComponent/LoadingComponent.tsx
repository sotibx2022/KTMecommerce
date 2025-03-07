import React from 'react';
import "../loadingComponent/loading.css"
const LoadingComponent = () => {
  return (
    <div className="loaderWrapper absolute top-0 left-0 w-full h-full bg-background flex-center z-10">
      <div className="cssload-thecube bg-background">
      <div className="cssload-cube cssload-c1"></div>
      <div className="cssload-cube cssload-c2"></div>
      <div className="cssload-cube cssload-c3"></div>
      <div className="cssload-cube cssload-c4"></div>
    </div>
    </div>
  );
}
export default LoadingComponent;