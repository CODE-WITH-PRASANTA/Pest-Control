
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import NewsDetailsMain from "../../Components/NewsDetailsMain/NewsDetailsMain";

const NewsDetails = () => {
  return (
    <>
      <Breadcrumb
        title="News Details"
        subtitle="Explore The Latest Updates From Insectra"
      />

      <section className="newsdetails-section">
        {/* Add your News Details content here */}

          <NewsDetailsMain/>
      </section>
    </>
  );
};

export default NewsDetails;
