
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ProjectDetailsMain from "../../Components/ProjectDetailsMain/ProjectDetailsMain";

const ProjectDetails = () => {
  return (
    <>
      <Breadcrumb
        title="Project Details"
        subtitle="Explore Our Pest Control Project"
      />

      <section className="projectdetails-section">
        {/* Add your Project Details content here */}

        <ProjectDetailsMain/>
      </section>
    </>
  );
};

export default ProjectDetails;
