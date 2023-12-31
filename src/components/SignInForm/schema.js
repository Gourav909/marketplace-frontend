import * as Yup from "yup";

export const SigninValidationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid Email"),
  password: Yup.string().required("Password is required"),
});
