import { Button, Paper } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDay();
const hour = date.getHours();
const min = date.getMinutes();

function Managerdashboard() {
  const navigate = useNavigate();

  if (sessionStorage.length != 0) {
    var token = sessionStorage.id;
    var user = jwt_decode(token);
  }
  const navButtons = [
    {
      name: "Leads",
      linkTo: "",
    },
    {
      name: "Service Requests",
      linkTo: "serviceRequests",
    },
    {
      name: "Employees",
      linkTo: "employees",
    },
    {
      name: "Customer Data",
      linkTo: "#",
    },
    {
      name: "Inventory",
      linkTo: "#",
    },
  ];

  const navButtonsForAdvisor = [
    {
      name: "Service Requests",
      linkTo: "",
    },
    {
      name: "Customer Data",
      linkTo: "#",
    },
    {
      name: "Inventory",
      linkTo: "#",
    },
  ];
  const navButtonsForTechnicians = [
    {
      name: "Service Requests",
      linkTo: "",
    },
  ];

  return (
    <div className="managerDashboard">
      <Paper
        className="sideNav"
        elevation={16}
        style={{ backgroundColor: "#3E0E40" }}
      >
        <div className="pageName">
          {" "}
          <span>Manager Dashboard</span>
        </div>
        {sessionStorage.getItem("technicianAuth") ? (
          <div className="navOptions">
            {navButtonsForTechnicians.map((data) => (
              <motion.div
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to={data.linkTo} style={{ textDecoration: "none" }}>
                  <Paper
                    elevation={8}
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#3E0E40",
                    }}
                    className="sideNavButtons"
                  >
                    <span className="navButtonText">{data.name}</span>
                  </Paper>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : sessionStorage.getItem("advisorAuth") ? (
          <div className="navOptions">
            {navButtonsForAdvisor.map((data) => (
              <motion.div
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to={data.linkTo} style={{ textDecoration: "none" }}>
                  <Paper
                    elevation={8}
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#3E0E40",
                    }}
                    className="sideNavButtons"
                  >
                    <span className="navButtonText">{data.name}</span>
                  </Paper>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="navOptions">
            {navButtons.map((data) => (
              <motion.div
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link to={data.linkTo} style={{ textDecoration: "none" }}>
                  <Paper
                    elevation={8}
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#3E0E40",
                    }}
                    className="sideNavButtons"
                  >
                    <span className="navButtonText">{data.name}</span>
                  </Paper>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </Paper>
      <div className="contentPage">
        <Paper
          className="topBar"
          style={{ backgroundColor: "GrayText" }}
          elevation={8}
        >
          <span style={{ fontSize: "25px" }}>
            {day}/{month}/{year}
          </span>
          <span style={{ fontSize: "25px" }}>
            {hour}:{min}
          </span>
          <span
            style={{
              fontSize: "25px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {user.name}
            <Button
              style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}
              onClick={() => sessionStorage.clear() || navigate("/")}
            >
              Log Out
            </Button>
          </span>
        </Paper>

        <Outlet />
      </div>
    </div>
  );
}

export default Managerdashboard;
