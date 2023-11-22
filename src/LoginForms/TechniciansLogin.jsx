import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../global";

function TechniciansLogin() {
  const navigate = useNavigate();
  const technicianLogin = useFormik({
    initialValues: {
      email: "",
      pin: "",
    },

    onSubmit: async (values) => {
      let logInData = await fetch(`${api}/technicianLogIn`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (logInData.status == 200) {
        let token = await logInData.json();
        sessionStorage.setItem("technicianAuth", token.token);
        sessionStorage.setItem("id", token.token);
        navigate("/managerDashBoard");
        setManagerLogInForm(false);
      
      } else {
        setErrorMessage("Invalid Credentials");
      }
    },
  });
  return (
    <div className="loginPage">
      <form
        className="managerLoginForm"
        onSubmit={technicianLogin.handleSubmit}
      >
        {" "}
        <span style={{ fontSize: "30px", fontWeight: "bold" }}>
          Technicians Login
        </span>
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          variant="standard"
          onChange={technicianLogin.handleChange}
          onBlur={technicianLogin.handleBlur}
        />
        {technicianLogin.touched.email ? (
          technicianLogin.values.email == "" ? (
            <span style={{ color: "red" }}>Email is required</span>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <TextField
          id="pin"
          label="Pin Number"
          name="pin"
          type="password"
          variant="standard"
          onChange={technicianLogin.handleChange}
          onBlur={technicianLogin.handleBlur}
        />
        {technicianLogin.touched.pin ? (
          technicianLogin.values.pin == "" ? (
            <span style={{ color: "red" }}>Pin code is required</span>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <Button type="submit">Log In</Button>
        <span>Only Manager can Add/reset passcode</span>
      </form>
      
    </div>
  );
}

export default TechniciansLogin;
