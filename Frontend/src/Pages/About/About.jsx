
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import AboutMain from "../../Components/AboutMain/AboutMain";
import AboutService from "../../Components/AboutService/AboutService";
import AboutWhy from "../../Components/AboutWhy/AboutWhy";
import AboutTeam from "../../Components/AboutTeam/AboutTeam";

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
        <AboutWhy/>
        <AboutTeam/>

      </section>
    </>
  );
};

export default About;
