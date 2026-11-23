
import React from 'react';
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import LizardserviceMain from "../../Components/LizardserviceMain/LizardserviceMain";

const LizardService = () => {
  return (
    <div>
      <Breadcrumb
        title="Lizard Control"
        subtitle="Professional Lizard Control Services to Keep Your Home and Workplace Safe, Hygienic and Free from Lizards with Effective and Reliable Pest Management Solutions."
      />

      <LizardserviceMain />
    </div>
  );
};

export default LizardService;
