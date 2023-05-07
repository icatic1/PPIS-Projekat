import React, { useState } from 'react'
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../../util/api'
import Header from '../../shared/header';
import NotFound from '../../shared/NotFound';
import { Container, Paper } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import {i18n} from 'dateformat';
import dateFormat from 'dateformat';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TopInfo from './TopInfo';
import Description from './Description';
import History from './History';

i18n.dayNames = [
  "Ned",
  "Pon",
  "Uto",
  "Sri",
  "Čet",
  "Pet",
  "Sub",
  "Nedjelja",
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Četvrtak",
  "Petak",
  "Subota",
];

i18n.monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Juni",
  "July",
  "August",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
];

function TicketOverview() {
  const location = useLocation();
  var mounted = false;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [ticket,setTicket] = useState();
  const [ticketComments, setTicketComments] = useState([]);
  

  useEffect(() => {
    if(!mounted && location.state==null) {
      mounted = true
      loadData();
    } else if(!mounted) {
      setTicket(location.state.ticket);
    }
    
  }, []);

  const loadData = () =>{
    if(id!=null) {
      api.get('/ticket/24').then((res)=> {
        setTicket(res.data);
      })

      api.get('/ticket-comment/ticket/24').then((res)=> {
        setTicketComments(res.data);
      })
    }
  }

  



  return (
    <div>
      <Header></Header>
      {id==null ? <NotFound></NotFound> : 
      <>
      { ticket?
       <Container sx={{ mt: 2 }} style={{ backgroundColor: "#F5F5F5", padding: 0, width: "80%" }}>
          <TopInfo ticket={ticket}/>
          <Description description={ticket.description}/>
          <History ticketComments={ticketComments}/>
          

       </Container> : <></>
      }
      </>
      }
    </div>
  )
}

export default TicketOverview