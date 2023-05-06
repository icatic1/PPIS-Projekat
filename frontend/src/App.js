import "./App.css";
import Login from "./components/shared/login";
import Home from "./components/shared/home";
import PrivateRoute from "./components/shared/privateroute";
import {Routes,Route} from "react-router-dom";
import { useState } from "react";
import CreateTicket from "./components/user/ticket-create/CreateTicket";
import TicketOverview from "./components/user/ticket-overview/TicketOverview"

function App() {

  return (
    <div>
    <Routes>
      <Route
        path="/"
        element= {<PrivateRoute />}
      >
        <Route path="/" element={<Home ></Home>}></Route>
        <Route path="/create-ticket" element={<CreateTicket ></CreateTicket>}></Route>
        <Route path="/ticket/:id" element={<TicketOverview></TicketOverview>}></Route>
        </Route>
      <Route
        path="/login"
        element= {<Login></Login>}
      />
    </Routes>
    </div>
  );
}

export default App;
