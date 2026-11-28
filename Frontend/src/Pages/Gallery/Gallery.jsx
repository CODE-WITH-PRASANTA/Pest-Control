import React from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import GalleryMain from "../../Components/GalleryMain/GalleryMain";

const Gallery = () => {
  return (
    <>
      <Breadcrumb title="Our Gallery" subtitle="Explore Our Work & Service Gallery" />
      <GalleryMain />
    </>
  );
};

export default Gallery;
