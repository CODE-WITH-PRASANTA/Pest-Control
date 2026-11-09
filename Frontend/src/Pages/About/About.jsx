
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import AboutMain from "../../Components/AboutMain/AboutMain";
import AboutService from "../../Components/AboutService/AboutService";

const About = () => {
  return (
    <>
      <Breadcrumb
        title="About Us"
        subtitle="Discover More About Insectra"
      />

      <section className="about-section">

        <AboutMain/>
        <AboutService/>
      </section>
    </>
  );
};

export default About;
