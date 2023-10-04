import React, { useState, useCallback } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
} from "@mui/material";
import { fetchPropertyById } from "src/redux/actions/utilsAction";
import {
  addItemToFavouriteList,
  deleteFavProperty,
} from "src/redux/actions/user";
import { deletePropertyAction } from "src/redux/actions/admin";

const CardItem = ({ item, setSelectedItemId, isFav = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentUserDetails } = useSelector(
    (state) => state.getCurrentUserReducer
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = currentUserDetails?.type;

  const editPropertyDetails = (id) => {
    dispatch(fetchPropertyById(id));
    navigate(`/admin/edit-properties/${id}`);
  };

  const onCardClickHandler = (id) => {
    dispatch(fetchPropertyById(id));
    navigate(`/user/property-details/${id}`);
  };

  const onMouseOver = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setIsHovered(false);
  }, []);

  const renderAdminActions = () => {
    if (!isHovered) return null;
    return (
      <>
        <Tooltip title="Edit" arrow>
          <IconButton
            onClick={() => editPropertyDetails(id)}
            sx={{
              position: "absolute",
              color: "white",
              marginLeft: "16%",
              zIndex: 1,
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <IconButton
            onClick={() => openDeleteDialog(id)}
            sx={{
              position: "absolute",
              color: "white",
              marginLeft: "18%",
              zIndex: 1,
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  const renderUserFavorite = (id) => {
    if (!isHovered) return null;
    return (
      <>
        {isFav || is_favourite ? (
          <IconButton
            sx={{
              position: "absolute",
              color: "red",
              marginLeft: "14%",
              zIndex: 1,
            }}
            onClick={() => {
              setSelectedItemId({
                actionType: "unfavouriteActionType",
                id: id,
              });
              dispatch(deleteFavProperty(id));
            }}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              position: "absolute",
              color: "red",
              marginLeft: "14%",
              zIndex: 1,
            }}
            //
            onClick={() => {
              setSelectedItemId({
                actionType: "addedToFavorite",
                id: id,
              });
              dispatch(
                addItemToFavouriteList({
                  property_id: id,
                  is_favourite: true,
                })
              );
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </>
    );
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDelete = (id) => {
    dispatch(deletePropertyAction(id));
    setSelectedItemId({
      actionType: "deleteProperty",
      id: id,
    });
    closeDeleteDialog();
  };

  const {
    id,
    title,
    price_per_month,
    net_size,
    net_size_in_sqr_feet,
    is_favourite,
    image_url,
    address,
    property_type,
  } = item;

  return (
    <Box
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      key={id}
      sx={{
        border: 1,
        borderRadius: 1,
        "&:hover .card-hover": {
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
      className="card-hover"
    >
      {userType !== "Admin" ? renderUserFavorite(id) : renderAdminActions()}
      <Card
        sx={{ maxWidth: 600, zIndex: 1 }}
        onClick={() => userType !== "Admin" && onCardClickHandler(id)}
      >
        <CardMedia
          sx={{
            height: 300,
            position: "relative",
          }}
          image={`${process.env.REACT_APP_API_BASE_URL}${image_url}`}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`NT$ ${price_per_month}/month`}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {address?.district} {address?.city}
          </Typography>
          <Typography variant="h6">Property Type: {property_type}</Typography>

          <Typography variant="h6">
            {net_size} Ping {`(${net_size_in_sqr_feet} sq.ft)`} |
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => confirmDelete(id)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default React.memo(CardItem);
