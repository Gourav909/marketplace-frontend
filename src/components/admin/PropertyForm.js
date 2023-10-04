import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  CssBaseline,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";

import {
  fetchCityAndDistrict,
  fetchPropertyById,
  updatePropertyById,
} from "src/utils/apiRequest";
import { propertyValidationSchema, initialValues } from "./schema";
import { addNewPropertyAction } from "src/redux/actions/admin";

const PropertyForm = ({ isEdit }) => {
  const [isShowSnackBar, setIsShowSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    altMessage: "",
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const params = useParams();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPropertyById(params.id);
        setFormikValues(data);
      } catch (error) {
        console.error("Error fetching property: ", error);
      }
    };
    if (isEdit) {
      fetchData();
    }
  }, [params.id]);

  useEffect(() => {
    const fetchCityAndDistrictData = async () => {
      const data = await fetchCityAndDistrict();
      setCityOptions(data);
    };
    fetchCityAndDistrictData();
  }, []);

  console.log("cityOptions", cityOptions);

  const handleDistrict = (e) => {
    const selectedValue = e.target.value;
    formik.setFieldValue("address_attributes.city_id", selectedValue);
    cityOptions.forEach((district) => {
      if (district.id === selectedValue) {
        setDistrictOptions(district.districts);
      }
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: propertyValidationSchema,
    onSubmit: (values) => {
      if (!isEdit) {
        dispatch(addNewPropertyAction(values));
      } else {
        updatePropertyById(params.id, values);
      }
    },
  });

  useEffect(() => {
    if (cityOptions.length) {
      cityOptions.forEach((district) => {
        if (district.id === formik.values.address_attributes?.city_id) {
          setDistrictOptions(district.districts);
        }
      });
    }
  }, [formik.values.address_attributes?.city_id]);

  const setFormikValues = (data) => {
    formik.setValues({
      title: data.title,
      price_per_month: data.price_per_month,
      net_size: data.net_size,
      no_of_rooms: data.no_of_rooms,
      property_type: data.property_type,
      description: data.description,
      address_attributes: {
        city_id: data.address.city_id,
        district_id: data.address.district_id,
      },
      image: data.image_url,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsShowSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  const { vertical, horizontal, open, altMessage } = isShowSnackBar;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {altMessage}
        </Alert>
      </Snackbar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            background: "#fbfbfb",
            border: "1px solid #ccc",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ marginBottom: "20px" }}
          >
            {isEdit ? "Edit Property" : "Add Property"}
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && formik.errors.title}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="property_type">Property Type</InputLabel>
                  <Select
                    label="Property Type"
                    id="property_type"
                    name="property_type"
                    value={formik.values.property_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.property_type &&
                      formik.errors.property_type
                    }
                    helperText={
                      formik.touched.property_type &&
                      formik.errors.property_type
                    }
                  >
                    <MenuItem value="residential">Residential</MenuItem>
                    <MenuItem value="retail">Retail</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="price_per_month"
                  name="price_per_month"
                  label="Price Per Month"
                  variant="outlined"
                  value={formik.values.price_per_month}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.price_per_month &&
                    formik.errors.price_per_month
                  }
                  helperText={
                    formik.touched.price_per_month &&
                    formik.errors.price_per_month
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="net_size"
                  name="net_size"
                  label="Net Size"
                  variant="outlined"
                  value={formik.values.net_size}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.net_size && formik.errors.net_size}
                  helperText={formik.touched.net_size && formik.errors.net_size}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="no_of_rooms"
                  name="no_of_rooms"
                  label="Number of Rooms"
                  variant="outlined"
                  value={formik.values.no_of_rooms}
                  error={
                    formik.touched.no_of_rooms && formik.errors.no_of_rooms
                  }
                  helperText={
                    formik.touched.no_of_rooms && formik.errors.no_of_rooms
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description && formik.errors.description
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="City">City</InputLabel>
                  {formik.values.address_attributes?.city_id}
                  <Select
                    label="City"
                    id="address_attributes.city_id"
                    name="address_attributes.city_id"
                    value={formik.values.address_attributes?.city_id}
                    onChange={handleDistrict}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address_attributes?.city_id &&
                      formik.errors.address_attributes?.city_id
                    }
                    helperText={
                      formik.touched.address_attribute?.city_id &&
                      formik.errors.address_attributes?.city_id
                    }
                  >
                    {cityOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="address_attributes.district_id">
                    District
                  </InputLabel>
                  <Select
                    label="District"
                    id="address_attributes.district_id"
                    name="address_attributes.district_id"
                    value={formik.values.address_attributes?.district_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address_attributes?.district_id &&
                      formik.errors.address_attributes?.district_id
                    }
                    helperText={
                      formik.touched.address_attributes?.district_id &&
                      formik.errors.address_attributes?.district_id
                    }
                  >
                    {districtOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.district_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    const { files } = e.target;
                    if (files[0]) {
                      setUploadedFile(files[0]);
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem" }}
              disabled={!formik.dirty || !formik.isValid}
            >
              Create property
            </Button>
          </Box>
        </Paper>
      </div>
    </Container>
  );
};

export default PropertyForm;
