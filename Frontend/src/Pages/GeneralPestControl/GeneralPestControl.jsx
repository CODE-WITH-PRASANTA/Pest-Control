
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import GeneralPestControlMain from "../../Components/GeneralPestControlMain/GeneralPestControlMain";

const GeneralPestControl = () => {
  return (
    <>
      <Breadcrumb
        title="General Pest Control"
        subtitle="Professional General Pest Control Services for a Safe and Healthy Environment"
      />

      <section className="general-pest-control-section">
        {/* Add your General Pest Control content here */}

        <GeneralPestControlMain/>
      </section>
    </>
  );
};

export default GeneralPestControl;
