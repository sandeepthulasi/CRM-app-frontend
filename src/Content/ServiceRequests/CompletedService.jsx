import { Button } from "@mui/material";
import React from "react";

function CompletedService({ completedData }) {
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
          </tr>
        </thead>
        <tbody>
          {completedData.map((data) => (
            <tr>
              <td>{completedData.indexOf(data) + 1}</td>
              <td>{data.date}</td>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.vehicleNumber}</td>
              <td>{data.serviceRequirements}</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompletedService;
