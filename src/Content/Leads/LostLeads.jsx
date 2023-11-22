import { Button } from "@mui/material";
import React from "react";
import api from "../../../global";

function LostLeads({ lostLeadsData, getLostLeads }) {
  async function deleteLostData(data) {
    const updateStatus = await fetch(`${api}/deleteLostData`, {
      method: "DELETE",
      headers: { "Content-type": "application/json", "x-auth-adminToken": sessionStorage.getItem("adminAuth"),},
      body: JSON.stringify(data),
    });
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
          {lostLeadsData.map((data) => (
            <tr>
              <td>{lostLeadsData.indexOf(data) + 1}</td>
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
                    style={{ color: "red" }}
                    onClick={() => deleteLostData(data)}
                  >
                    Delete
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

export default LostLeads;
