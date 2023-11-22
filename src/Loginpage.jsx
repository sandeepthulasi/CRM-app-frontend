import { Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Loginpage() {
  const userButtons = [
    {
      name: "Manager",
      linkTo: "managerForms",
    },
    {
      name: "Admin",
      linkTo: "adminForms",
    },
    {
      name: "Service Advisors",
      linkTo: "advisorForms",
    },
    {
      name: "Technicians",
      linkTo: "techniciansForms",
    },
  ];

  return (
    <div className="loginPage">
      <div className="textArea">
        <span>CRM SYSTEM</span>
        <span>Select User</span>
      </div>
      <div className="loginUserButtons">
        {userButtons.map((data) => (
          <Link to={data.linkTo} style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Paper className="selectUserButtons" elevation={8}>
                {data.name}
              </Paper>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Loginpage;
