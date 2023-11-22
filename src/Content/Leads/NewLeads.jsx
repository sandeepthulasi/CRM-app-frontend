import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../global";

function NewLeads({ newLeadsData, getNewLeads, getContactedLeads }) {
  async function updateContactedStatus(data) {
    const update = await fetch(`${api}/contactedLeads`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
      },
      body: JSON.stringify(data),
    });
    getNewLeads();
    getContactedLeads();
  }
  console.log(newLeadsData);
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
          {newLeadsData.map((data) => (
            <tr>
              <td>{newLeadsData.indexOf(data) + 1}</td>
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
                    style={{ color: "purple" }}
                    onClick={() => updateContactedStatus(data)}
                  >
                    Contact
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

export default NewLeads;
