import React, { useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import ProductImageSlide from "../components/user/ProductImageSlide";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyById } from "../redux/actions/utilsAction";

const ProductDetailPage = () => {
  const { propertyDetail } = useSelector(
    (state) => state.fetchPropertyByIdReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertyById());
  }, [dispatch]);

  const images = [
    "https://loremflickr.com/640/360",
    "https://loremflickr.com/640/360",
    "https://loremflickr.com/640/360",
  ];
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <NavBar />
      <Box
        sx={{
          marginTop: "50px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            marginBottom: "20px",
            marginLeft: "50px",
          }}
          color="text.secondary"
        >
          MRT市政府/全新完工頂級純辦 (B036787)
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} sx={{ marginLeft: "50px" }}>
            <ProductImageSlide
              imagesArray={images}
              onChange={(current, prev) => setIndex(current)}
              index={index}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              textAlign: "left",
              marginLeft: "50px",
            }}
          >
            <Typography variant="h4">NT$ 17,481,600 / month</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Description or other details about the product
            </Typography>
            <Typography
              sx={{
                marginTop: "20px",
              }}
              variant="h6"
            >
              Location: Songgao Rd. Xinyi Dist., Taipei City
            </Typography>
            <Typography variant="h6">Status: Office</Typography>
            <Typography variant="h6">Layout: 0 Bed 0 Bath</Typography>
            <Typography variant="h6">
              Size: 3642 Ping (129594.01 sq.ft)
            </Typography>
            <Typography variant="h6">Floor: 45F</Typography>
            <Typography variant="h6">Parking: Contact sales</Typography>
            <Typography variant="h6">MRT: Taipei City Hall</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default React.memo(ProductDetailPage);
