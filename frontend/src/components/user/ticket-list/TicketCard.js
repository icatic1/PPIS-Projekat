import React from 'react';
import { Card} from '@mui/material';
import dateFormat from 'dateformat';
import ReportIcon from "@mui/icons-material/Report";
import {Button} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../../util/api";
import { red } from '@mui/material/colors';
import authService from '../../../util/auth.service';



function TicketCard({t}) {

    const user = authService.getCurrentUser();
    const navigate = useNavigate();
    const assignTicket = () => {
        try {
        api.post("/ticket/assign/"+t.id).then((res)=> {
            if(res.status==200) {
              api.post("/ticket-comment/add",{ticketId:t.id,comment:"Preuzet zahtjev"})
              navigate("/ticket?id="+t.id)
            }
        }) } catch(e) {
            console.log(e)
        }
    }

    const priority = (ticket) => {
        switch (ticket.priorityLevel) {
          case "LOW":
            return (
              <div style={{ width: "fit-content", float: "left" }}>
                <ReportIcon
                  style={{
                    color: "#2e7d32",
                    verticalAlign: "middle",
                    verticalAlign: "middle",
                  }}
                ></ReportIcon>
                <span
                  style={{
                    color: "#2e7d32",
                    fontWeight: "bold",
                    fontFamily: "Yantramanav",
                    verticalAlign: "middle",
                    paddingLeft: "10px",
                  }}
                >
                  Nizak prioritet
                </span>
              </div>
            );
            break;
          case "MEDIUM":
            return (
              <div style={{ width: "fit-content", float: "left" }}>
                <ReportIcon
                  style={{ color: "#ffc400", verticalAlign: "middle" }}
                ></ReportIcon>
                <span
                  style={{
                    color: "#ffc400",
                    fontWeight: "bold",
                    fontFamily: "Yantramanav",
                    verticalAlign: "middle",
                    paddingLeft: "10px",
                  }}
                >
                  Srednji prioritet
                </span>
              </div>
            );
            break;
          case "HIGH":
            return (
              <div style={{ width: "fit-content", float: "left" }}>
                <ReportIcon
                  style={{ color: "#ed6c02", verticalAlign: "middle" }}
                ></ReportIcon>
                <span
                  style={{
                    color: "#ed6c02",
                    fontWeight: "bold",
                    fontFamily: "Yantramanav",
                    verticalAlign: "middle",
                    paddingLeft: "10px",
                  }}
                >
                  Visok prioritet
                </span>
              </div>
            );
            break;
          case "URGENT":
            return (
              <div style={{ width: "fit-content", float: "left" }}>
                <ReportIcon
                  style={{ color: "#c62828", verticalAlign: "middle" }}
                ></ReportIcon>
                <span
                  style={{
                    color: "#c62828",
                    fontWeight: "bold",
                    fontFamily: "Yantramanav",
                    verticalAlign: "middle",
                    paddingLeft: "10px",
                  }}
                >
                  Urgentno
                </span>
              </div>
            );
            break;
        }
      };
    
      const category = (ticket) => {
        switch (ticket.category) {
          case "SOFTWARE":
            return "Softver";
            break;
          case "HARDWARE":
            return "Hardver";
            break;
          case "NETWORK":
            return "Mreža";
            break;
          default:
            return "Ostalo";
            break;
        }
      };


  return (
    <div><Card
    hoverable
    key={t.id}
    style={{
      padding: 15,
      marginBottom: 20,
      height: "auto",
      backgroundColor: "white",
      fontFamily: "Yantramanav",
      overflow: "hidden",
      justifyContent: "space-between",
    }}
  >
    <div style={{ width: "100%" }}>
      <span
        style={{
          fontWeight: "bold",
          float: "left",
          fontFamily: "Yantramanav",
        }}
      >
        {dateFormat(t.date, "dd/mm/yyyy, HH:MM")}
      </span>
      <span
        style={{
          fontWeight: "bold",
          float: "right",
          fontFamily: "Yantramanav",
        }}
      >
        Kategorija: {category(t)}
      </span>
    </div>

    <Link
      style={{
        clear: "both",
        float: "left",
        fontWeight: "bold",
        fontSize: "1.8em",
        fontFamily: "Yantramanav",
        textDecoration:"none",
        color:"#00101f"
      }}
      to={"/ticket?id=" + t.id}
      
    >
      {t.title}
    </Link>
    <span
      style={{
        clear: "both",
        float: "left",
        marginBottom: "20px",
        fontFamily: "Yantramanav",
      }}
    >
      Šifra: {t.code}
    </span>

    <div style={{ width: "100%" }}>
      <span
        style={{
          fontWeight: "bold",
          clear: "both",
          float: "left",
          fontFamily: "Yantramanav",
        }}
      >
        {t.createdBy.firstname} {t.createdBy.lastname}
      </span>
      <span
        style={{
          fontFamily: "Yantramanav",
          fontWeight: "bold",
          float: "right",
        }}
      >
        {priority(t)}
      </span>
      {t.status=="ACTIVE" && user.role=="sd_agent" ?<Button
                  style={{
                    clear:'both',
                    float:"right",
                    backgroundColor: "#00101F",
                    marginLeft: "90%",
                    marginTop: 5,
                    padding: "0px 20px 0px 20px",
                    textTransform: "none",
                    fontFamily: "Yantramanav",
                    fontWight: "500",
                    fontSize: "18px",
                    color: "white",
                  }}
                  onClick={assignTicket}
                  sx={{ marginLeft: 8 }}
                >
                  Preuzmi
                </Button> : <></>}
    </div>
  </Card></div>
  )
}

export default TicketCard