
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ProjectMain from "../../Components/ProjectMain/ProjectMain";

const Projects = () => {
  return (
    <>
      <Breadcrumb
        title="Our Projects"
        subtitle="Explore Our Successful Pest Control Projects"
      />

      <section className="projects-section">
        <ProjectMain/>
      </section>
    </>
  );
};

export default Projects;
