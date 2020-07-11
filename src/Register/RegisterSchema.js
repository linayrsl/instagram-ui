import * as Yup from "yup";
import config from "../config/index";

export const RegisterSchema = Yup.object()
  .shape({
    username: Yup.string()
      .min(2, "Username too short")
      .max(16, "Username too long")
      .required("Username required")
      .test("isUsernameDup", "Username is already exists", async (value) => {
        const res = await fetch(`${config.apiUrl}/users/validate/username`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        });
        return res.status !== 409;
      }),
    password: Yup.string()
      .min(6, "Password too short")
      .max(16, "Password too long")
      .required("Password required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email required")
      .test("isUsernameDup", "Email is already exists", async (value) => {
        const res = await fetch(`${config.apiUrl}/users/validate/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        });
        return res.status !== 409;
      }),
    terms: Yup.boolean()
      .oneOf([true], "Must agree to terms"),
  });
