import { Button, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useFormik } from "formik";

function Leads({
  newLeadsData,
  getNewLeads,
  contactedLeadsData,
  qualifiedLeadsData,
  lostLeadsData,
  confirmedLeadsData,
  cancelledLeadsData,
}) {
  const [form, setForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const Leads = [
    {
      name: "New",
      counts: newLeadsData.length,
      color: "blue",
      linkTo: "",
    },
    {
      name: "Contacted",
      counts: contactedLeadsData.length,
      color: "orange",
      linkTo: "contacted",
    },
    {
      name: "Qualified",
      counts: qualifiedLeadsData.length,
      color: "yellow",
      linkTo: "qualified",
    },
    {
      name: "Lost",
      counts: lostLeadsData.length,
      color: "grey",
      linkTo: "lost",
    },
    {
      name: "Cancelled",
      counts: cancelledLeadsData.length,
      color: "red",
      linkTo: "cancelled",
    },
    {
      name: "Confirmed",
      counts: confirmedLeadsData.length,
      color: "green",
      linkTo: "confirmed",
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
      lable: "Requirement",
      name: "requirements",
      type: "text",
    },
  ];

  const addNewLeads = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      requirements: "",
    },
    onSubmit: async (values) => {
      const postData = await fetch(`${api}/addLeads`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
        },
        body: JSON.stringify(values),
      });
      if (postData.status == 200) {
        setForm(false);
        getNewLeads();
      } else {
        setErrorMessage("Error in adding the data");
      }
    },
  });

  return (
    <>
      <div className="pageOptions">
        {Leads.map((data) => (
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
        {sessionStorage.getItem("managerAuth")?"":sessionStorage.getItem("adminAuth")?<motion.div
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => setForm(true)}
        >
          <Paper className="options">
            <AddIcon /> New Lead
          </Paper>
        </motion.div>:""}
      </div>
      <Outlet />
      {form ? (
        <div className="addLeadsFormSection">
          <Paper elevation={8} className="addLeadsFrom">
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
              onSubmit={addNewLeads.handleSubmit}
            >
              {formTextFields.map((data) => (
                <TextField
                  id={data.name}
                  label={data.lable}
                  name={data.name}
                  type={data.type}
                  variant="standard"
                  onChange={addNewLeads.handleChange}
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

export default Leads;
