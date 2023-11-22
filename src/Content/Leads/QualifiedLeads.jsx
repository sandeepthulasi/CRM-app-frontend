import { Button } from "@mui/material";
import React from "react";
import api from "../../../global";

function QualifiedLeads({
  qualifiedLeadsData,
  getQualifiedLeads,
  getConfirmedLeads,
  getCancelledLeads,
}) {
  async function updateConfirmedStatus(data) {
    const update = await fetch(`${api}/confirmedLeads`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
      },
      body: JSON.stringify(data),
    });
    getQualifiedLeads();
    getConfirmedLeads();
  }

  async function updateCancelledStatus(data) {
    const update = await fetch(`${api}/cancelledLeads`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
      },
      body: JSON.stringify(data),
    });
    getQualifiedLeads();
    getCancelledLeads();
  }
  return (
    <div className="contentTableSection">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Requirements</th>
            <th>Status</th>
            {sessionStorage.getItem("managerAuth") ? "" : <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {qualifiedLeadsData.map((data) => (
            <tr>
              <td>{qualifiedLeadsData.indexOf(data) + 1}</td>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.requirements}</td>
              <td>{data.status}</td>
              {sessionStorage.getItem("managerAuth") ? (
                ""
              ) : (
                <td>
                  <Button
                    style={{ color: "green" }}
                    onClick={() => updateConfirmedStatus(data)}
                  >
                    Confirmed
                  </Button>
                  /
                  <Button
                    style={{ color: "red" }}
                    onClick={() => updateCancelledStatus(data)}
                  >
                    Cancelled
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

export default QualifiedLeads;
