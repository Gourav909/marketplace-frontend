import React, { useEffect } from "react";
import { Typography, Grid, Box } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import ProductImageSlide from "../components/user/ProductImageSlide";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertyById } from "../redux/actions/utilsAction";
import { useParams } from "react-router-dom";

const PropertyDetailPage = () => {
  const { propertyDetail } = useSelector(
    (state) => state.fetchPropertyByIdReducer
  );
  const {
    address,
    description,
    id,
    image_url,
    net_size,
    net_size_in_sqr_feet,
    no_of_rooms,
    price_per_month,
    property_type,
    title,
    user_id,
  } = propertyDetail;
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertyById(params.id));
  }, [dispatch, params.id]);

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
          {title}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} sx={{ marginLeft: "50px" }}>
            <img src="https://loremflickr.com/640/360" />
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
            <Typography variant="h4">NT$ {price_per_month} / month</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {description}
            </Typography>
            <Typography
              sx={{
                marginTop: "20px",
              }}
              variant="h6"
            >
              Location: {address?.district_name} Dist., {address?.city_name}
            </Typography>
            <Typography variant="h6">Property Type: {property_type}</Typography>
            <Typography variant="h6">Number of Room: {no_of_rooms}</Typography>
            <Typography variant="h6">
              Size: {net_size} Ping ({net_size_in_sqr_feet} sq.ft)
            </Typography>
            <Typography variant="h6">MRT: {address?.city_name}</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default React.memo(PropertyDetailPage);
