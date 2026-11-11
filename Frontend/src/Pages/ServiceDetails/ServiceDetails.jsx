
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ServiceDetailsMain from "../../Components/ServiceDetailsMain/ServiceDetailsMain";

const ServiceDetails = () => {
  return (
    <>
      <Breadcrumb
        title="Service Details"
        subtitle="Explore Our Professional Pest Control Solutions"
      />

      <section className="servicedetails-section">
        {/* Add your Service Details content here */}

        <ServiceDetailsMain/>
      </section>
    </>
  );
};

export default ServiceDetails;
