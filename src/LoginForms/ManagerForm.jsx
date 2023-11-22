import { Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../global";

function ManagerForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [managerLogInForm, setManagerLogInForm] = useState(true);
  const [newManagerSignup, setNewManagerSignup] = useState(false);
  const [managerOtpVerification, setManagerOtpVerification] = useState(false);
  const [newPinSetForm, setNewPinSetForm] = useState(false);
  const managerLogin = useFormik({
    initialValues: {
      email: "",
      pin: "",
    },

    onSubmit: async (values) => {
      let logInData = await fetch("http://localhost:4000/managerLogIn", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (logInData.status == 200) {
        let token = await logInData.json();
        sessionStorage.setItem("managerAuth", token.token);
        sessionStorage.setItem("id", token.token);
        navigate("/managerDashBoard");
        setManagerLogInForm(false);
      } else {
        setErrorMessage("Invalid Credentials");
      }
    },
  });

  const signUpForm = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      let signUpData = await fetch(`${api}/managerSignUp`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (signUpData.status == 201) {
        setManagerOtpVerification(true);
        setManagerLogInForm(false);
        setNewManagerSignup(false);
        setNewPinSetForm(false);
      } else if (signUpData.status == 400 || signUpData.status == 401) {
        setErrorMessage("Invalid credentials try any other email");
      }
    },
  });

  const signUpOtpForm = useFormik({
    initialValues: {
      otp: "",
    },
    onSubmit: async (values) => {
      let otpData = await fetch(
        `${api}/managerSignUp/otpVerification`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (otpData.status == 200) {
        setManagerOtpVerification(false);
        setManagerLogInForm(false);
        setNewManagerSignup(false);
        setNewPinSetForm(true);
        setErrorMessage("");
      } else if (otpData.status == 400) {
        setErrorMessage("OTP does not match");
      }
    },
  });

  const setNewPasscode = useFormik({
    initialValues: {
      name: "",
      phone: "",
      pin: "",
      confirmPin: "",
    },
    onSubmit: async (values) => {
      let userData = await fetch(
        `${api}/managerSignUp/${signUpForm.values.email}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (userData.status == 200) {
        setManagerOtpVerification(false);
        setManagerLogInForm(true);
        setNewManagerSignup(false);
        setNewPinSetForm(false);
        setErrorMessage("");
        window.location.reload()
      } else if (userData.status == 400) {
        setErrorMessage("Check the pin number");
      }
    },
  });
  return (
    <div className="loginPage">
      {managerLogInForm &&
      !newManagerSignup &&
      !managerOtpVerification &&
      !newPinSetForm ? (
        <form className="managerLoginForm" onSubmit={managerLogin.handleSubmit}>
          {" "}
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Manager Login
          </span>
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="standard"
            onChange={managerLogin.handleChange}
            onBlur={managerLogin.handleBlur}
          />
          {managerLogin.touched.email ? (
            managerLogin.values.email == "" ? (
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
            onChange={managerLogin.handleChange}
            onBlur={managerLogin.handleBlur}
          />
          {managerLogin.touched.pin ? (
            managerLogin.values.pin == "" ? (
              <span style={{ color: "red" }}>Pin code is required</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <Button type="submit">Log In</Button>
          <Button
            onClick={() =>
              setManagerLogInForm(false) || setNewManagerSignup(true)
            }
          >
            Sign Up
          </Button>
          <Button>Forgot Password?</Button>
        </form>
      ) : !managerLogInForm &&
        newManagerSignup &&
        !managerOtpVerification &&
        !newPinSetForm ? (
        <form className="managerLoginForm" onSubmit={signUpForm.handleSubmit}>
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Manager Signup
          </span>
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="standard"
            onChange={signUpForm.handleChange}
            onBlur={signUpForm.handleBlur}
          />
          {signUpForm.touched.email ? (
            signUpForm.values.email == "" ? (
              <span style={{ color: "red" }}>Email is required</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <Button
            type="submit"
            onClick={() => (document.getElementById("email").value = "")}
          >
            Send OTP
          </Button>
        </form>
      ) : !managerLogInForm &&
        !newManagerSignup &&
        managerOtpVerification &&
        !newPinSetForm ? (
        <form
          className="managerSignupOtpForm"
          onSubmit={signUpOtpForm.handleSubmit}
        >
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Verify OTP
          </span>
          <TextField
            id="otpPin"
            label="OTP"
            name="otp"
            type="password"
            variant="standard"
            onChange={signUpOtpForm.handleChange}
            onBlur={signUpOtpForm.handleBlur}
          />
          {signUpOtpForm.touched.otp ? (
            signUpOtpForm.values.otp == "" ? (
              <span style={{ color: "red" }}>Enter otp for verification</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <span>{errorMessage}</span>
          <Button type="submit">Verify OTP</Button>
        </form>
      ) : !managerLogInForm &&
        !newManagerSignup &&
        !managerOtpVerification &&
        newPinSetForm ? (
        <form
          className="ManagerNewPinForm"
          onSubmit={setNewPasscode.handleSubmit}
        >
          {" "}
          <span style={{ fontSize: "30px", fontWeight: "bold" }}>
            Set New Pin
          </span>
          <TextField
            id="standard-basic"
            label="Name"
            name="name"
            type="text"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.name ? (
            setNewPasscode.values.name == "" ? (
              <span style={{ color: "red" }}>Enter your name</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <TextField
            id="standard-basic"
            label="Phone Number"
            name="phone"
            type="number"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.phone ? (
            setNewPasscode.values.phone == "" ? (
              <span style={{ color: "red" }}>Enter your phone number</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <TextField
            id="standard-basic"
            label="New Pin"
            name="pin"
            type="number"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.pin ? (
            setNewPasscode.values.pin == "" ? (
              <span style={{ color: "red" }}>Enter your new pass code</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <TextField
            id="standard-basic"
            label="Confirm Pin"
            name="confirmPin"
            type="number"
            variant="standard"
            onChange={setNewPasscode.handleChange}
            onBlur={setNewPasscode.handleBlur}
          />
          {setNewPasscode.touched.confirmPin ? (
            setNewPasscode.values.confirmPin == "" ? (
              <span style={{ color: "red" }}>Re-enter your new pass code</span>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <Button type="submit">Sign Up</Button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default ManagerForm;
