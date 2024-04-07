import React from "react";

const ImageCard = ({
  src,
  alt = "image",
  height = "600px",
  width = "400px",
}) => {
  return (
    <div className="carousel-item object-cover transition-transform hover:scale-105 duration-300 ease-in-out">
      <img src={src} alt={alt} style={{ height, width }} />
    </div>
  );
};

export default ImageCard;
