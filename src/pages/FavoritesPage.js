import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Stack, CircularProgress } from "@mui/material";

import CardItem from "../components/CardItem/CardItem";

import NavBar from "../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavouritePropertiesList } from "../redux/actions/user";
import { updateStore } from "src/redux/actions/utilsAction";

export default function FavoritesPage() {
  const [selectedItemId, setSelectedItemId] = useState({
    actionType: "",
    id: null,
  });
  const { favouriteProperties, isFetching } = useSelector(
    (state) => state.fetchFavouriteList
  );

  const { unFavouriteProperty } = useSelector(
    (state) => state.deleteFavPropertyReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavouritePropertiesList());
  }, [dispatch]);

  useEffect(() => {
    if (selectedItemId) {
      dispatch(updateStore(selectedItemId));
      setSelectedItemId({
        actionType: "",
        id: null,
      });
    }
  }, [dispatch, unFavouriteProperty]);

  return (
    <div>
      <NavBar />

      <Container>
        <Grid container spacing={2}>
          {isFetching ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="inherit" />
            </Stack>
          ) : (
            favouriteProperties?.map((property, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                <CardItem
                  item={property}
                  index={index}
                  setSelectedItemId={setSelectedItemId}
                />
              </Grid>
            ))
          )}
        </Grid>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Pagination count={10} color="primary" />
          </Stack>
        </Box> */}
      </Container>
    </div>
  );
}
