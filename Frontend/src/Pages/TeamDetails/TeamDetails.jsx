
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import TeamDetailsFirst from "../../Components/TeamDetailsFirst/TeamDetailsFirst";
import TeamDetailsSecond from "../../Components/TeamDetailsSecond/TeamDetailsSecond";
import TeamDetailsThird from "../../Components/TeamDetailsThird/TeamDetailsThird";

const TeamDetails = () => {
  return (
    <>
      <Breadcrumb
        title="Team Details"
        subtitle="Meet Our Professional Pest Control Experts"
      />

      <section className="teamdetails-section">
        {/* Add your Team Details content here */}

        <TeamDetailsFirst/>
        <TeamDetailsSecond/>
        <TeamDetailsThird/>
      </section>
    </>
  );
};

export default TeamDetails;
