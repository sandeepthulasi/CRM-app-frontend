import { Button, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import api from "../../../global";

function ServiceRequests({
  newServiceData,
  openServiceData,
  inProcessData,
  completedData,
  getCreatedRequests,
  cancelledRequestData,
}) {
  const [form, setForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const serviceRequests = [
    {
      name: "Created",
      counts: newServiceData.length,
      color: "blue",
      linkTo: "",
    },
    {
      name: "Open",
      counts: openServiceData.length,
      color: "orange",
      linkTo: "openRequests",
    },
    {
      name: "In Process",
      counts: inProcessData.length,
      color: "yellow",
      linkTo: "inProcessRequests",
    },
    {
      name: "Cancelled",
      counts: cancelledRequestData.length,
      color: "red",
      linkTo: "cancelledRequests",
    },
    {
      name: "Completed",
      counts: completedData.length,
      color: "green",
      linkTo: "completedService",
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

  const addNewSeviceRequests = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      vehicleNumber: "",
      serviceRequirements: "",
      date: "",
    },
    onSubmit: async (values) => {
      const postData = await fetch(`${api}/addServiceRequests`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
        },
        body: JSON.stringify(values),
      });
      if (postData.status == 200) {
        setForm(false);
        getCreatedRequests();
      } else {
        setErrorMessage("Error in adding the data");
      }
    },
  });
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
              <Paper
                className="options"
                style={{ borderLeft: `5px solid ${data.color}` }}
              >
                <span>{data.name}</span>
                <span>{data.counts}</span>
              </Paper>
            </Link>
          </motion.div>
        ))}
        {sessionStorage.getItem("managerAuth") ||
        sessionStorage.getItem("adminAuth") ? (
          ""
        ) : sessionStorage.getItem("advisorAuth") ? (
          <motion.div
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => setForm(true)}
          >
            <Paper className="options">
              <AddIcon /> Add Service
            </Paper>
          </motion.div>
        ) : (
          ""
        )}
      </div>
      <Outlet />
      {form ? (
        <div className="addServiceFormSection">
          <Paper elevation={8} className="addServiceFrom">
            <div className="closeButton">
              <IconButton color="error" onClick={() => setForm(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <form
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              onSubmit={addNewSeviceRequests.handleSubmit}
            >
              {formTextFields.map((data) => (
                <TextField
                  id={data.name}
                  label={data.lable}
                  name={data.name}
                  type={data.type}
                  variant="standard"
                  onChange={addNewSeviceRequests.handleChange}
                />
              ))}
              <span>{errorMessage}</span>
              <Button type="submit"> Add</Button>
            </form>
          </Paper>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ServiceRequests;
