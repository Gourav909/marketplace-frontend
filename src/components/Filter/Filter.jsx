import React, { useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { filterPropertiesAction } from "../../redux/actions/user";
import SliderInput from "src/components/SliderInput/SliderInput";

import SelectInput from "../SelectInput/SelectInput";

const Filter = ({ onClose, searchInput, currentPage }) => {
  const initialFilter = {
    city: "",
    district: [],
    property_type: "",
    price_per_month: [1000, 30000],
    net_size: [300, 3000],
  };
  const [selectedFilters, setSelectedFilters] = useState({ ...initialFilter });
  const dispatch = useDispatch();

  const cityOptions = [
    { value: "taipei city", label: "Taipei City" },
    { value: "new taipei city", label: "New Taipei City" },
  ];

  const typeOptions = [
    { value: "residential", label: "Residential" },
    { value: "office", label: "Office" },
    { value: "retail", label: "Retail" },
  ];

  const districtOptions = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters({
      ...selectedFilters,
      [name]: value,
    });
  };
  function buildQueryParams(filter) {
    const queryParams = [];

    for (const key in filter) {
      const value = filter[key];

      if (value !== null && value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          queryParams.push(`filter_by[${key}]=${value.join(",")}`);
        } else {
          queryParams.push(`filter_by[${key}]=${value}`);
        }
      }
    }

    return queryParams.join("&");
  }

  const handleSubmit = () => {
    const queryParams = buildQueryParams(selectedFilters);
    let queryParam = `page=${currentPage}&filter_by[search]=${searchInput}`;

    let queryParamWithString = queryParams.concat("&", queryParam);
    dispatch(filterPropertiesAction(queryParamWithString));
  };

  const { city, property_type, district, net_size, price_per_month } =
    selectedFilters;

  return (
    <Grid container spacing={2} sx={{ marginTop: "2px" }}>
      <Grid item xs={12}>
        <SelectInput
          label="Property Type"
          name="property_type"
          value={property_type}
          options={typeOptions}
          onChange={handleFilterChange}
        />

        <SelectInput
          label="City"
          name="city"
          value={city}
          options={cityOptions}
          onChange={handleFilterChange}
        />

        <SelectInput
          label="District"
          name="district"
          value={district}
          options={districtOptions}
          multiple={true}
          onChange={handleFilterChange}
        />

        <SliderInput
          label="Net Size"
          name="net_size"
          value={net_size}
          min={300}
          max={3000}
          onChange={handleFilterChange}
        />

        <SliderInput
          label="Rent Per Month"
          name="price_per_month"
          value={price_per_month}
          min={1000}
          max={30000}
          onChange={handleFilterChange}
        />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="flex-end">
        <Box mt={2}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            sx={{ marginRight: "20px" }}
            onClick={handleSubmit}
          >
            Apply Filters
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="medium"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default React.memo(Filter);

Filter.propTypes = {
  onClose: PropTypes.func.isRequired,
};
