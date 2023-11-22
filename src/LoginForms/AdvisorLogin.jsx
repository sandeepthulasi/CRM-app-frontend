import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../global";

function AdvisorLogin() {
    const navigate = useNavigate();
    const advisorLogIn = useFormik({
      initialValues: {
        email: "",
        pin: "",
      },
  
      onSubmit: async (values) => {
        let logInData = await fetch(`${api}/advisorLogIn`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (logInData.status == 200) {
          let token = await logInData.json();
          sessionStorage.setItem("advisorAuth", token.token);
          sessionStorage.setItem("id", token.token);
          navigate("/managerDashBoard");
          setManagerLogInForm(false);
          window.location.reload()
        } else {
          setErrorMessage("Invalid Credentials");
        }
      },
    });
  return (
    <div className="loginPage">
    <form className="managerLoginForm" onSubmit={advisorLogIn.handleSubmit}>
      {" "}
      <span style={{ fontSize: "30px", fontWeight: "bold" }}>
        Service Advisor Login
      </span>
      <TextField
        id="email"
        label="Email"
        name="email"
        type="email"
        variant="standard"
        onChange={advisorLogIn.handleChange}
        onBlur={advisorLogIn.handleBlur}
      />
      {advisorLogIn.touched.email ? (
        advisorLogIn.values.email == "" ? (
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
        onChange={advisorLogIn.handleChange}
        onBlur={advisorLogIn.handleBlur}
      />
      {advisorLogIn.touched.pin ? (
        advisorLogIn.values.pin == "" ? (
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

export default AdvisorLogin