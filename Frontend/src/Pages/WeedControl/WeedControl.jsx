
import React from 'react';
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import WeedcontrolMain from "../../Components/WeedcontrolMain/WeedcontrolMain";

const WeedControl = () => {
  return (
    <div>
      <Breadcrumb
        title="Weed Control Services"
        subtitle="Professional Weed Control Services to Remove Unwanted Weeds, Prevent Excessive Growth and Maintain Clean, Healthy and Well-Maintained Outdoor Spaces."
      />

      <WeedcontrolMain />
    </div>
  );
};

export default WeedControl;
