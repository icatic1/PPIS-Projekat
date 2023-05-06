import React from 'react'
import {useLocation} from 'react-router-dom';

function TicketOverview() {
  const location = useLocation();
  return (
    <div>{JSON.stringify(location.state)}</div>
  )
}

export default TicketOverview