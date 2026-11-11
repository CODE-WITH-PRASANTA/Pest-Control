
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ServiceMain from "../../Components/ServiceMain/ServiceMain";

const Services = () => {
  return (
    <>
      <Breadcrumb
        title="Our Services"
        subtitle="Professional Pest Control Solutions"
      />

      <section className="services-section">
        {/* Add your Services content here */}

        <ServiceMain/>

        
      </section>
    </>
  );
};

export default Services;
