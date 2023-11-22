import { Button, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useFormik } from "formik";

function Employees() {
  const [form, setForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const serviceRequests = [
    {
      name: "Admin",
      counts: "",
      linkTo: "",
    },
    {
      name: "Service Advisor",
      counts: "",
      linkTo: "serviceAdvisor",
    },
    {
      name: "Technician",
      counts: "",
      linkTo: "technician",
    },
  ];
  const formTextFields = [
    {
      lable: "Name",
      name: "name",
      type: "text",
    },
    {
      lable: "Email",
      name: "email",
      type: "email",
    },
    {
      lable: "Phone",
      name: "phone",
      type: "number",
    },
    {
      lable: "Vehicle Number",
      name: "vehicleNumber",
      type: "text",
    },
    {
      lable: "Service Requirement",
      name: "serviceRequirements",
      type: "text",
    },
    {
      lable: "",
      name: "date",
      type: "date",
    },
  ];
  return (
    <>
      <div className="pageOptions">
        {serviceRequests.map((data) => (
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to={data.linkTo} style={{ textDecoration: "none" }}>
              <Paper className="options">
                <span>{data.name}</span>
                <span>{data.counts}</span>
              </Paper>
            </Link>
          </motion.div>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default Employees;
