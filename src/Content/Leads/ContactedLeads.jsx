import { Button } from "@mui/material";
import React from "react";
import api from "../../../global";

function ContactedLeads({
  contactedLeadsData,
  getContactedLeads,
  getQualifiedLeads,
  getLostLeads,
}) {
  async function updateQualifiedStatus(data) {
    const update = await fetch(`${api}/qualifiedLeads`, {
      method: "PUT",
      headers: { "Content-type": "application/json", "x-auth-adminToken": sessionStorage.getItem("adminAuth"), },
      body: JSON.stringify(data),
    });
    getContactedLeads();
    getQualifiedLeads();
  }

  async function updateLostStatus(data) {
    const update = await fetch(`${api}/lostLeads`, {
      method: "PUT",
      headers: { "Content-type": "application/json", "x-auth-adminToken": sessionStorage.getItem("adminAuth"), },
      body: JSON.stringify(data),
    });
    getContactedLeads();
    getLostLeads();
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
          {contactedLeadsData.map((data) => (
            <tr>
              <td>{contactedLeadsData.indexOf(data) + 1}</td>
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
                    onClick={() => updateQualifiedStatus(data)}
                  >
                    Qualified
                  </Button>
                  /
                  <Button
                    style={{ color: "red" }}
                    onClick={() => updateLostStatus(data)}
                  >
                    Lost
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

export default ContactedLeads;
