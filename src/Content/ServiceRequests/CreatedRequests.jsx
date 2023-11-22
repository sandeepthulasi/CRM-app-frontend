import { Button } from "@mui/material";
import React from "react";
import api from "../../../global";

function CreatedRequests({
  newServiceData,
  getCreatedRequests,
  getOpenRequests,
  getCancelledData,
}) {
  // update to open status
  async function updateConfirmedStatus(data) {
    const update = await fetch(`${api}/openRequests`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
      },
      body: JSON.stringify(data),
    });
    getCreatedRequests();
    getOpenRequests();
  }

  // update to cancelled status
  async function updateCancelledStatus(data) {
    const update = await fetch(`${api}/cancelRequests`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-adminToken": sessionStorage.getItem("advisorAuth"),
      },
      body: JSON.stringify(data),
    });
    getCancelledData();
    getCreatedRequests();
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
          {newServiceData.map((data) => (
            <tr>
              <td>{newServiceData.indexOf(data) + 1}</td>
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
                    onClick={() => updateConfirmedStatus(data)}
                  >
                    Open Request
                  </Button>
                  /
                  <Button
                    style={{ color: "red" }}
                    onClick={() => updateCancelledStatus(data)}
                  >
                    Cancel
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

export default CreatedRequests;
