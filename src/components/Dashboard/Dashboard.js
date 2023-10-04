import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Pagination,
  Stack,
  Button,
  Box,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { deletePropertyAction } from "src/redux/actions/admin";
import { updateStore } from "src/redux/actions/utilsAction";
import CardItem from "src/components/CardItem/CardItem";
import SearchBar from "src/components/SearchBar/SearchBar";
import Modal from "src/components/Modal/Modal";
import Filter from "src/components/Filter/Filter";
import useDebounce from "src/hooks/useDebounce";
import { filterPropertiesAction } from "src/redux/actions/user";
import { fetchProperties } from "src/redux/actions/utilsAction";

const Dashboard = ({ properties, handlePageChange, currentPage }) => {
  const [searchInput, setSearchInput] = useState(null);
  const [isShowSnackBar, setIsShowSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    altMessage: "",
  });
  const { pagination } = useSelector((state) => state.fetchPropertiesReducer);

  const [selectedItemId, setSelectedItemId] = useState({
    actionType: "",
    id: null,
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { currentUserDetails } = useSelector(
    (state) => state.getCurrentUserReducer
  );
  const { propertyAddedToFavouriteRes } = useSelector(
    (state) => state.addItemToFavouriteListReducer
  );
  const { deleteProperty } = useSelector(
    (state) => state.deletePropertyReducer
  );
  const [debouncedSearch] = useDebounce(searchInput);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = currentUserDetails?.type;
  const totalPages = pagination?.total_pages;

  useEffect(() => {
    if (debouncedSearch) {
      let queryParam = `page=${currentPage}&filter_by[search]=${debouncedSearch}`;
      dispatch(filterPropertiesAction(queryParam));
      return;
    }
  }, [dispatch, debouncedSearch]);

  useEffect(() => {
    if (selectedItemId) {
      dispatch(updateStore(selectedItemId));
      setSelectedItemId({
        actionType: "",
        id: null,
      });
    }
  }, [dispatch, deleteProperty, propertyAddedToFavouriteRes]);

  const onChangeHandler = (event) => {
    let { value } = event.target;

    setSearchInput(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsShowSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  const handleModalPopup = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const renderUserUI = () => {
    return (
      <>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <SearchBar onChangeHandler={onChangeHandler} />
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={1}>
          <Tooltip title="Filter" arrow>
            <IconButton onClick={handleModalPopup}>
              <FilterAltIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </>
    );
  };
  const renderAdminUI = () => {
    return (
      <Grid item xs={6} sm={3} md={4} lg={4}>
        <Button
          variant="contained"
          fullWidth
          endIcon={<AddIcon />}
          onClick={addNewPropertyHandler}
          sx={{
            maxWidth: "153px",
            float: "right",
          }}
        >
          Add
        </Button>
      </Grid>
    );
  };

  const addNewPropertyHandler = () => navigate("/admin/add-new-property");
  const { vertical, horizontal, open, altMessage } = isShowSnackBar;

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {altMessage}
        </Alert>
      </Snackbar>
      <Container>
        <Grid>{userType !== "Admin" ? renderUserUI() : renderAdminUI()}</Grid>

        <Grid container spacing={2}>
          {properties?.map((property, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <CardItem
                item={property}
                index={index}
                setSelectedItemId={setSelectedItemId}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              onChange={(event, value) => {
                handlePageChange(event, value);
              }}
            />
          </Stack>
        </Box>
      </Container>
      <Modal
        open={isFilterModalOpen}
        onClose={handleModalPopup}
        childComponent={
          <Filter
            currentPage={currentPage}
            searchInput={debouncedSearch}
            onClose={handleModalPopup}
          />
        }
      />
    </>
  );
};

export default Dashboard;
