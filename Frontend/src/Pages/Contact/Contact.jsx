
import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import ContactMain from "../../Components/ContactMain/ContactMain";

const Contact = () => {
  return (
    <>
      <Breadcrumb
        title="Contact Us"
        subtitle="Get In Touch With Insectra"
      />

      <section className="contact-section">
         <ContactMain/>
      </section>
    </>
  );
};

export default Contact;
