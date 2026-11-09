
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import NewsMain from "../../Components/NewsMain/NewsMain";

const News = () => {
  return (
    <>
      <Breadcrumb
        title="Latest News"
        subtitle="Explore The Latest News From Insectra"
      />

      <section className="news-section">
       
       <NewsMain/>
      </section>
    </>
  );
};

export default News;
