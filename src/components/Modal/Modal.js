import React from "react";
import { Dialog, IconButton, Grid } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const Modal = (props) => {
  const { open, onClose, childComponent } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        minHeight: "100px",
      }}
    >
      <Grid container justifyContent="flex-end" alignItems="flex-end" p={2}>
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid container p={4}>
        <Grid item xs={12}>
          {childComponent}
        </Grid>
      </Grid>
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  childComponent: PropTypes.element.isRequired,
};

export default React.memo(Modal);

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  childComponent: PropTypes.node.isRequired,
};
