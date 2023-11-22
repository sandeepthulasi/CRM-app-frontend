import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Managerdashboard from "./Managerdashboard";
import Loginpage from "./Loginpage";
// import Adminmanagement from "./Adminmanagement";
// import Serviceadvisorsmanagement from "./Serviceadvisorsmanagement";
// import Techniciansmanagement from "./Techniciansmanagement";
import ManagerForm from "./LoginForms/ManagerForm";
import NewLeads from "./Content/Leads/NewLeads";
import Leads from "./Content/Leads/Leads";
import { useEffect, useState } from "react";
import ContactedLeads from "./Content/Leads/ContactedLeads";
import QualifiedLeads from "./Content/Leads/QualifiedLeads";
import LostLeads from "./Content/Leads/LostLeads";
import CanceledLeads from "./Content/Leads/CanceledLeads";
import ConfirmedLeads from "./Content/Leads/ConfirmedLeads";
import ServiceRequests from "./Content/ServiceRequests/ServiceRequests";
import CreatedRequests from "./Content/ServiceRequests/CreatedRequests";
import OpenRequests from "./Content/ServiceRequests/OpenRequests";
import InProcessRequests from "./Content/ServiceRequests/InProcessRequests";
import CancelledRequests from "./Content/ServiceRequests/CancelledRequests";
import CompletedService from "./Content/ServiceRequests/CompletedService";
import Employees from "./Content/Employees/Employees";
import Adminmanagement from "./Content/Employees/Adminmanagement";
import Serviceadvisorsmanagement from "./Content/Employees/Serviceadvisorsmanagement";
import Techniciansmanagement from "./Content/Employees/Techniciansmanagement";
import AdminLogin from "./LoginForms/AdminLogin";
import AdvisorLogin from "./LoginForms/AdvisorLogin";
import TechniciansLogin from "./LoginForms/TechniciansLogin";
import api from "../global";

function App() {
  // *************************Leads api fetch function***********************************
  // get new leads data
  const [newLeadsData, setNewLeadsData] = useState([]);
  async function getNewLeads() {
    const getData = await fetch(`${api}/getNewLeads`, {
      method: "GET",
      headers: { "x-auth-managerToken": sessionStorage.getItem("adminAuth") },
    });
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setNewLeadsData([]);
    } else {
      setNewLeadsData(jsonData);
    }
  }

  // get contacted leads data
  const [contactedLeadsData, setContactedLeadsData] = useState([]);
  async function getContactedLeads() {
    const getData = await fetch(`${api}/getContactedLeads`, {
      method: "GET",
      headers: { "x-auth-managerToken": sessionStorage.getItem("adminAuth") },
    });
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setContactedLeadsData([]);
    } else {
      setContactedLeadsData(jsonData);
    }
  }

  // get qualified leads data
  const [qualifiedLeadsData, setQualifiedLeadsData] = useState([]);
  async function getQualifiedLeads() {
    const getData = await fetch(`${api}/getQualifiedLeads`, {
      method: "GET",
      headers: { "x-auth-managerToken": sessionStorage.getItem("adminAuth") },
    });
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setQualifiedLeadsData([]);
    } else {
      setQualifiedLeadsData(jsonData);
    }
  }

  // get lost leads data
  const [lostLeadsData, setLostLeadsData] = useState([]);
  async function getLostLeads() {
    const getData = await fetch(`${api}/getLostLeads`, {
      method: "GET",
      headers: { "x-auth-managerToken": sessionStorage.getItem("adminAuth") },
    });
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setLostLeadsData([]);
    } else {
      setLostLeadsData(jsonData);
    }
  }

  // get confirmed leads data
  const [confirmedLeadsData, setConfirmedData] = useState([]);
  async function getConfirmedLeads() {
    const getData = await fetch(`${api}/getConfirmedLeads`, {
      method: "GET",
      headers: { "x-auth-managerToken": sessionStorage.getItem("adminAuth") },
    });
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setConfirmedData([]);
    } else {
      setConfirmedData(jsonData);
    }
  }

  // get cancelled leads data
  const [cancelledLeadsData, setCancelledData] = useState([]);
  async function getCancelledLeads() {
    const getData = await fetch(`${api}/getCancelledLeads`, {
      method: "GET",
      headers: { "x-auth-managerToken": sessionStorage.getItem("adminAuth") },
    });
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setCancelledData([]);
    } else {
      setCancelledData(jsonData);
    }
  }
  // *************************Leads api fetch function***********************************

  // *************************Service Requests api fetch function***********************************
  // get Created Service Requests data
  const [newServiceData, setNewServiceData] = useState([]);
  async function getCreatedRequests() {
    const getData = await fetch(
      `${api}/getCreatedServiceRequests`,
      {
        method: "GET",
        headers: {
          "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
          "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
        },
      }
    );
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setNewServiceData([]);
    } else {
      setNewServiceData(jsonData);
    }
  }

  // get Open Service Requests data
  const [openServiceData, setOpenServiceData] = useState([]);
  async function getOpenRequests() {
    const getData = await fetch(
      `${api}/getOpenServiceRequests`,
      {
        method: "GET",
        headers: {
          "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
          "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
        },
      }
    );
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setOpenServiceData([]);
    } else {
      setOpenServiceData(jsonData);
    }
  }

  // get Open Service Requests data
  const [inProcessData, setInProcessData] = useState([]);
  async function getInProcessData() {
    const getData = await fetch(`${api}/getServiceInProcees`, {
      method: "GET",
      headers: {
        "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
        "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
      },
    });
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setInProcessData([]);
    } else {
      setInProcessData(jsonData);
    }
  }

  // getCompleted Service Requests data
  const [completedData, setCompletedData] = useState([]);
  async function getCompletedData() {
    const getData = await fetch(
      `${api}/getCompletedServiceData`,
      {
        method: "GET",
        headers: {
          "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
          "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
        },
      }
    );
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setCompletedData([]);
    } else {
      setCompletedData(jsonData);
    }
  }

  // get Cancelled Service Requests data
  const [cancelledRequestData, setCancelledRequestData] = useState([]);
  async function getCancelledData() {
    const getData = await fetch(
      `${api}/getCancelledServiceRequests`,
      {
        method: "GET",
        headers: {
          "x-auth-advisorToken": sessionStorage.getItem("advisorAuth"),
          "x-auth-adminToken": sessionStorage.getItem("adminAuth"),
        },
      }
    );
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setCancelledRequestData([]);
    } else {
      setCancelledRequestData(jsonData);
    }
  }

  // *************************Service Requests api fetch function***********************************

  // *************************Admin Page api fetch function***********************************

  // get Admin  data
  const [adminData, setAdminData] = useState([]);
  async function getAdminData() {
    const getData = await fetch(`${api}/getAdminData`);
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setAdminData([]);
    } else {
      setAdminData(jsonData);
    }
  }

  // get Service Advisor data
  const [advisorData, setAdvisorData] = useState([]);
  async function getAdvisorData() {
    const getData = await fetch(`${api}/getAdvisorData`);
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setAdvisorData([]);
    } else {
      setAdvisorData(jsonData);
    }
  }

  // get Technician data
  const [technicianData, setTechnicianData] = useState([]);
  async function getTechnicianData() {
    const getData = await fetch(`${api}/getTechnicianData`);
    const jsonData = await getData.json();
    if (jsonData.message == "no data") {
      setTechnicianData([]);
    } else {
      setTechnicianData(jsonData);
    }
  }

  useEffect(() => {
    // leads
    getNewLeads();
    getContactedLeads();
    getQualifiedLeads();
    getLostLeads();
    getConfirmedLeads();
    getCancelledLeads();
    // service requests
    getCreatedRequests();
    getOpenRequests();
    getInProcessData();
    getCompletedData();
    getCancelledData();
    // Admin Data
    getAdminData();
    // Service Advisor Data
    getAdvisorData();
    // Technician Data
    getTechnicianData();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="managerForms" element={<ManagerForm />} />
        <Route path="adminForms" element={<AdminLogin />} />
        <Route path="advisorForms" element={<AdvisorLogin />} />
        <Route path="techniciansForms" element={<TechniciansLogin />} />
        <Route path="managerDashBoard" element={<Managerdashboard />}>
          {sessionStorage.getItem("adminAuth") ||sessionStorage.getItem("managerAuth")? (
            <>
              <Route
                path=""
                element={
                  <Leads
                    newLeadsData={newLeadsData}
                    getNewLeads={getNewLeads}
                    contactedLeadsData={contactedLeadsData}
                    qualifiedLeadsData={qualifiedLeadsData}
                    lostLeadsData={lostLeadsData}
                    confirmedLeadsData={confirmedLeadsData}
                    cancelledLeadsData={cancelledLeadsData}
                  />
                }
              >
                <Route
                  path=""
                  element={
                    <NewLeads
                      newLeadsData={newLeadsData}
                      getNewLeads={getNewLeads}
                      getContactedLeads={getContactedLeads}
                    />
                  }
                />
                <Route
                  path="contacted"
                  element={
                    <ContactedLeads
                      contactedLeadsData={contactedLeadsData}
                      getContactedLeads={getContactedLeads}
                      getQualifiedLeads={getQualifiedLeads}
                      getLostLeads={getLostLeads}
                    />
                  }
                />
                <Route
                  path="qualified"
                  element={
                    <QualifiedLeads
                      qualifiedLeadsData={qualifiedLeadsData}
                      getQualifiedLeads={getQualifiedLeads}
                      getConfirmedLeads={getConfirmedLeads}
                      getCancelledLeads={getCancelledLeads}
                    />
                  }
                />
                <Route
                  path="lost"
                  element={
                    <LostLeads
                      lostLeadsData={lostLeadsData}
                      getLostLeads={getLostLeads}
                    />
                  }
                />
                <Route
                  path="cancelled"
                  element={
                    <CanceledLeads
                      cancelledLeadsData={cancelledLeadsData}
                      getCancelledLeads={getCancelledLeads}
                    />
                  }
                />
                <Route
                  path="confirmed"
                  element={
                    <ConfirmedLeads confirmedLeadsData={confirmedLeadsData} />
                  }
                />
              </Route>
              <Route
                path="serviceRequests"
                element={
                  <ServiceRequests
                    newServiceData={newServiceData}
                    openServiceData={openServiceData}
                    inProcessData={inProcessData}
                    completedData={completedData}
                    cancelledRequestData={cancelledRequestData}
                    getCreatedRequests={getCreatedRequests}
                  />
                }
              >
                <Route
                  path=""
                  element={
                    <CreatedRequests
                      newServiceData={newServiceData}
                      getCreatedRequests={getCreatedRequests}
                      getOpenRequests={getOpenRequests}
                      getCancelledData={getCancelledData}
                    />
                  }
                />
                <Route
                  path="openRequests"
                  element={
                    <OpenRequests
                      openServiceData={openServiceData}
                      getOpenRequests={getOpenRequests}
                      getInProcessData={getInProcessData}
                    />
                  }
                />
                <Route
                  path="inProcessRequests"
                  element={
                    <InProcessRequests
                      inProcessData={inProcessData}
                      getInProcessData={getInProcessData}
                      getCompletedData={getCompletedData}
                    />
                  }
                />
                <Route
                  path="cancelledRequests"
                  element={
                    <CancelledRequests
                      cancelledRequestData={cancelledRequestData}
                      getCancelledData={getCancelledData}
                    />
                  }
                />
                <Route
                  path="completedService"
                  element={<CompletedService completedData={completedData} />}
                />
              </Route>
              <Route path="employees" element={<Employees />}>
                <Route
                  path=""
                  element={
                    <Adminmanagement
                      adminData={adminData}
                      getAdminData={getAdminData}
                    />
                  }
                />
                <Route
                  path="serviceAdvisor"
                  element={
                    <Serviceadvisorsmanagement
                      advisorData={advisorData}
                      getAdvisorData={getAdvisorData}
                    />
                  }
                />
                <Route
                  path="technician"
                  element={
                    <Techniciansmanagement
                      technicianData={technicianData}
                      getTechnicianData={getTechnicianData}
                    />
                  }
                />
              </Route>
            </>
          ) : sessionStorage.getItem("advisorAuth") ||
            sessionStorage.getItem("technicianAuth") ? (
            <Route
              path=""
              element={
                <ServiceRequests
                  newServiceData={newServiceData}
                  openServiceData={openServiceData}
                  inProcessData={inProcessData}
                  completedData={completedData}
                  cancelledRequestData={cancelledRequestData}
                  getCreatedRequests={getCreatedRequests}
                />
              }
            >
              <Route
                path=""
                element={
                  <CreatedRequests
                    newServiceData={newServiceData}
                    getCreatedRequests={getCreatedRequests}
                    getOpenRequests={getOpenRequests}
                    getCancelledData={getCancelledData}
                  />
                }
              />
              <Route
                path="openRequests"
                element={
                  <OpenRequests
                    openServiceData={openServiceData}
                    getOpenRequests={getOpenRequests}
                    getInProcessData={getInProcessData}
                  />
                }
              />
              <Route
                path="inProcessRequests"
                element={
                  <InProcessRequests
                    inProcessData={inProcessData}
                    getInProcessData={getInProcessData}
                    getCompletedData={getCompletedData}
                  />
                }
              />
              <Route
                path="cancelledRequests"
                element={
                  <CancelledRequests
                    cancelledRequestData={cancelledRequestData}
                    getCancelledData={getCancelledData}
                  />
                }
              />
              <Route
                path="completedService"
                element={<CompletedService completedData={completedData} />}
              />
            </Route>
          ) : (
            ""
          )}
        </Route>
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("managerAuth");
  return token ? (
    <section>{children}</section>
  ) : (
    <Navigate replace to="/">
      {" "}
    </Navigate>
  );
}
export default App;
