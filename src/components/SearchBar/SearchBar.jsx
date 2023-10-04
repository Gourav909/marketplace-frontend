import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onChangeHandler }) => (
  <>
    <TextField
      type="search"
      id="search-bar"
      label="Search any task"
      variant="outlined"
      placeholder="Search tasks..."
      sx={{
        width: "100%",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(event) => onChangeHandler(event)}
    />
  </>
);

export default SearchBar;
