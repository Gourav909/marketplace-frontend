import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const ProductImageSlide = (props) => {
  const { imagesArray, onChange, index } = props;
  return (
    <>
      <Carousel
        index={index}
        interval={4000}
        animation="slide"
        stopAutoPlayOnHover
        swipe
        onChange={onChange}
      >
        {imagesArray.map((image, index) => (
          <Paper key={index}>
            <img
              src={image}
              alt="efefwef"
              style={{ width: "100%", height: "100%" }}
            />
          </Paper>
        ))}
      </Carousel>
      ;
    </>
  );
};
export default React.memo(ProductImageSlide);
