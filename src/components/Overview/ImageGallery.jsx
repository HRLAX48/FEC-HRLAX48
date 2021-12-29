import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { v4 as uuidv4 } from "uuid";

export default function ImageGallery({ selectedStyle }) {
  const image =
    selectedStyle.photos &&
    selectedStyle.photos.map((photo) => {
      return (
        <div>
          <img
            key={uuidv4()}
            src={photo.url}
            style={{ objectFit: "cover", height: 400 }}
          />
        </div>
      );
    });

  return (
    <div>
      <Carousel infiniteLoop showStatus={false} key={uuidv4()}>
        {image}
      </Carousel>
    </div>
  );
}
