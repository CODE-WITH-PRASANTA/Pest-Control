
import React from 'react';
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import WaspmanagementserviceMain from "../../Components/WaspmanagementserviceMain/WaspmanagementserviceMain";

const WaspManagementService = () => {
  return (
    <div>
      <Breadcrumb
        title="Wasp Management Services"
        subtitle="Professional Wasp Management Services to Safely Control Wasp Infestations, Remove Nests and Protect Your Home, Workplace and Commercial Properties from Potential Wasp Threats."
      />

      <WaspmanagementserviceMain />
    </div>
  );
};

export default WaspManagementService;
