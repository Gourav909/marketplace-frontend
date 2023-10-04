import { Box, Typography, Slider, FormControl } from "@mui/material";
import { memo } from "react";

const SliderInput = ({ label, name, value, min, max, onChange }) => (
  <FormControl sx={{ m: 1 }} fullWidth>
    <Typography id={`${name}-slider`} gutterBottom>
      {label}
    </Typography>
    <Slider
      value={value}
      name={name}
      onChange={(event) => onChange(event)}
      valueLabelDisplay="auto"
      aria-labelledby={`${name}-slider`}
      min={min}
      max={max}
      data-testid="slider-input"
    />
    <Box display="flex" justifyContent="space-between">
      <Typography variant="caption">
        {label}: {value[0]}
      </Typography>
      <Typography variant="caption">
        {label}: {value[1]}
      </Typography>
    </Box>
  </FormControl>
);
export default memo(SliderInput);
