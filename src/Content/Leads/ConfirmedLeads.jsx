import { Button } from "@mui/material";
import React from "react";

function ConfirmedLeads({ confirmedLeadsData }) {
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
          {confirmedLeadsData.map((data) => (
            <tr>
              <td>{confirmedLeadsData.indexOf(data) + 1}</td>
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
                    Book Service
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

export default ConfirmedLeads;
