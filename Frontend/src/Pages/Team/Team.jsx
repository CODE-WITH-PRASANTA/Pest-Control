
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import TeamContainer from "../../Components/TeamContainer/TeamContainer";

const Team = () => {
  return (
    <>
      <Breadcrumb
        title="Our Team"
        subtitle="Meet Our Professional Team"
      />

      <section className="team-section">
        {/* Add your Team content here */}
        <TeamContainer/>

      </section>
    </>
  );
};

export default Team;
