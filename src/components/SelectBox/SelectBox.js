import React from "react";
import PropTypes from "prop-types";
import { FormControl, TextField, Autocomplete } from "@mui/material";

const SelectBox = (props) => {
  const { label, options, value, onChange } = props;
  return (
    <FormControl fullWidth>
      <Autocomplete
        value={value}
        onChange={onChange}
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </FormControl>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default SelectBox;
