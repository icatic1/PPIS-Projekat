import React from 'react';
import { Container, Paper } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import {i18n} from 'dateformat';
import dateFormat from 'dateformat';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


function TopInfo({ticket}) {

    const priority = () => {
        switch(ticket.priorityLevel) {
          case "LOW":
          return(
            <div style={{width:"fit-content",float:"left"}}>
            <ReportIcon style={{color: "#2e7d32",verticalAlign:"middle",verticalAlign:"middle" }}></ReportIcon>
            <span style={{color: "#2e7d32",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Nizak prioritet</span>
            </div>
          )
          break;
          case "MEDIUM":
            return(
              <div style={{width:"fit-content",float:"left"}}>
              <ReportIcon style={{color: "#ffc400",verticalAlign:"middle" }}></ReportIcon>
              <span style={{color: "#ffc400",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Srednji prioritet</span>
              </div>
            )
            break;
          case "HIGH":
            return(
              <div style={{width:"fit-content",float:"left"}}>
              <ReportIcon style={{color: "#ed6c02",verticalAlign:"middle" }}></ReportIcon>
              <span style={{color: "#ed6c02",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Visok prioritet</span>
              </div>
            )
            break;
          case "URGENT":
            return(
              <div style={{width:"fit-content",float:"left"}}>
              <ReportIcon style={{color: "#c62828",verticalAlign:"middle" }}></ReportIcon>
              <span style={{color: "#c62828",fontWeight:"bold", fontFamily:"Yantramanav",verticalAlign:"middle", paddingLeft:"10px" }}>Urgentno</span>
              </div>
            )
            break;
        }
      }
    
      const category = () => {
        switch(ticket.category) {
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
      }
    

  return (
    <Container sx={{ mt: 2 }} style={{ backgroundColor: "#00101F", padding: 30, width: "100%",margin:0,height:150 }}>
          <div style={{width:"100%"}}>
          {priority()}
          <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",float:"right"}}>{dateFormat(ticket.date, " dddd, dd. mmmm  yyyy. H:MM ")}</span>
          </div>
          <div style={{width:"100%",clear:"both",marginTop:"30px"}}>
            <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",float:"left",fontSize:"180%"}}>{ticket.title}</span>
            <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",fontSize:"90%",float:"right",textAlign:"middle"}}>0 povezanih zahtjeva | Kategorija: {category()}</span>
          </div>
          <div style={{width:"100%",clear:"both",marginTop:"30px"}}>
            <span style={{fontFamily:"Yantramanav",color:"white",fontWeight:"bold",float:"left",fontSize:"100%"}}>Prijavio: {ticket.createdBy.firstname} {ticket.createdBy.lastname}</span>
            <ButtonGroup style={{float:"right",margin:0}}>
              <Button
                  style={{
                    backgroundColor: "#ff5252",
                    textTransform: 'none',
                    fontFamily: "Yantramanav",
                    fontWeight: "500", fontSize: "15px", color: "white",
                    height:"30px"
                }}
               
              >Izbriši zahtjev</Button>
              <Button
                 style={{
                  backgroundColor: "#00101F",
                   padding: "5px 20px 5px 20px", textTransform: 'none',
                  fontFamily: "Yantramanav",
                  fontWeight: "500", fontSize: "15px", color: "white",
                  height:"30px"
              }}
              >Potvrdi rješenje</Button>
            </ButtonGroup>
          </div>
          </Container>
  )
}

export default TopInfo