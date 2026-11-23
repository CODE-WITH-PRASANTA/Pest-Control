
import React from 'react';
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import FoggingserviceMain from '../../Components/FoggingserviceMain/FoggingserviceMain';

const FoggingService = () => {
  return (
    <div>
      <Breadcrumb
        title="Fogging Services"
        subtitle="Professional Fogging Services to Effectively Control Mosquitoes and Flying Insects, Reduce Pest Breeding and Maintain a Safe, Healthy and Pest-Free Environment."
      />

      <FoggingserviceMain/>
    </div>
  );
};

export default FoggingService;
