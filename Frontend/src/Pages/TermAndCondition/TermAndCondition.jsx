
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import TermAndConditionMain from "../../Components/TermAndConditionMain/TermAndConditionMain";

const TermAndCondition = () => {
  return (
    <>
      <Breadcrumb
        title="Terms & Conditions"
        subtitle="Please Read Our Terms and Conditions Carefully"
      />

      <section className="terms-section">
        <TermAndConditionMain />
      </section>
    </>
  );
};

export default TermAndCondition;
