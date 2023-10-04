import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Grid,
  Link,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginImage from "src/login.svg";
import { signInAuth } from "src/redux/actions/auth";
import { SigninValidationSchema } from "./schema";

const initialValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [isShowSnackBar, setIsShowSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    altMessage: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signInDetails, isError } = useSelector(
    (state) => state.signInAuthReducer
  );

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SigninValidationSchema,
      onSubmit: (values) => {
        handleLogin(values);
      },
    });

  useEffect(() => {
    if (signInDetails?.data?.success) {
      const { data, headers } = signInDetails;

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          accessToken: headers["access-token"],
          clientId: headers["client"],
          uid: headers["uid"],
        })
      );

      const targetPath =
        data.data.type === "Admin" ? "/admin/dashboard" : "/user/dashboard";
      navigate(targetPath);
      return;
    }

    if (isError?.errors) {
      const message = isError.errors[0];
      setIsShowSnackBar((prevState) => ({
        ...prevState,
        open: true,
        altMessage: message,
      }));
      return;
    }
  }, [navigate, signInDetails, isError]);

  const handleLogin = async (values) => {
    dispatch(signInAuth({ ...values }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsShowSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  const { vertical, horizontal, open, altMessage } = isShowSnackBar;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <img src={LoginImage} alt="login" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {altMessage}
            </Alert>
          </Snackbar>
          <Box
            sx={{
              width: "70%",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
              />
              <Grid container />
              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
              </Box>
            </Box>
            <Grid container justifyContent="center">
              <Typography
                sx={{
                  display: "inline-block",
                }}
              >
                Don't have an account?
              </Typography>
              <Link href="/sign-up" variant="body2">
                Sign up?
              </Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default React.memo(SignInForm);
