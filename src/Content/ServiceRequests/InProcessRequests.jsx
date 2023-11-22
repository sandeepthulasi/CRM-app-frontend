import { Button } from "@mui/material";
import React from "react";
import api from "../../../global";

function InProcessRequests({
  inProcessData,
  getInProcessData,
  getCompletedData,
}) {
  async function updateCompletedStatus(data) {
    const update = await fetch(`${api}/serviceCompleted`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
      },
      body: JSON.stringify(data),
    });
    getCompletedData();
    getInProcessData();
  }
  return (
    <div className="contentTableSection">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>vehicle Number</th>
            <th>Service</th>
            <th>Status</th>
            {sessionStorage.getItem("managerAuth") ||
            sessionStorage.getItem("adminAuth") ||
            sessionStorage.getItem("technicianAuth") ? (
              ""
            ) : (
              <th>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {inProcessData.map((data) => (
            <tr>
              <td>{inProcessData.indexOf(data) + 1}</td>
              <td>{data.date}</td>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.vehicleNumber}</td>
              <td>{data.serviceRequirements}</td>
              <td>{data.status}</td>
              {sessionStorage.getItem("managerAuth") ||
              sessionStorage.getItem("adminAuth") ||
              sessionStorage.getItem("technicianAuth") ? (
                ""
              ) : (
                <td>
                  <Button
                    style={{ color: "purple" }}
                    onClick={() => updateCompletedStatus(data)}
                  >
                    Completed
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InProcessRequests;
