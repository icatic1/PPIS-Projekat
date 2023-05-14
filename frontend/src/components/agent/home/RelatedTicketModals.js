import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState, useEffect } from "react";
import api from "../../../util/api";
import "./tablecss.css";
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  backgroundColor: '#111111',
  bgcolor: '#dfdfdf',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {backgroundColor: "#00101F",margin:10,textTransform: 'none',fontFamily:"Yantramanav",fontWight:"500",fontSize:"18px"}

const style3 = {backgroundColor: "#dfdfdf",textTransform: 'none',fontFamily:"Yantramanav",fontWight:"500",fontSize:"18px"}

export default function RelatedTicketModals() {
  const[circle, setCircle] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [relatedId, setRelatedId] = useState(0)
  const [items, setItems] = useState([])

  function FetchTickets() {
    console.log("start")
    setCircle(30)
    api.get("/ticket/related/" + relatedId).then(x => {
      api.post("/ticket/idarray", {"ids": x.data.relatedTicketIds}).then(x2 => {
        setItems(x2.data);
        setCircle(0)
        console.log(items[0])
      })
    })
  }

  useEffect(() => {
    
    
  }, [items]);

  return (
    <div>
      <Button onClick={handleOpen} type="submit"
                color="primary"
                variant="contained"
                style={style2}
                sx={{ mt: 0, mb: 2 }}>Open modal</Button>
      <Modal
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{bgcolor:"#aaaaaa"}}
        color="#aaaaaa"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Poveži zahtjeve
          </Typography>


          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <InputLabel>Id zahtjeva</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="Id zahtjeva"
                onChange={(e) => setRelatedId(e.target.value)}
              />
              <Button onClick={FetchTickets} type="submit"
                color="primary"
                variant="contained"
                style={style2}
                sx={{ mt: 0, mb: 0 }}>
              Pretraži 
            </Button>
            <CircularProgress size={circle} sx={{ m: "auto"}}/>

            <table class="tablebig">
          {items.map(item => (
            <>
              <tr key={item.id}>
                <td class="trround">
                  <table class="table1"> 
                    <tr>
                      <td class="td1 tdround"><b>#{item.id}</b></td>
                      <td class="td2 tdround">{new Date(item.date).toLocaleString()}</td>
                    </tr>
                    <tr> 
                      <td class="td3 tdround"><b>{item.title}</b></td>
                      <td class="td4 tdround">{item.createdBy.firstname} {item.createdBy.lastname}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="tdsep"><Button onClick={handleClose} style={style3}>Poveži</Button></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </>
          ))}
        </table>
          </Typography>


          <Button onClick={handleClose} type="submit"
                color="primary"
                variant="contained"
                style={style2}
                sx={{ mt: 0, mb: 2 }}>
            Zatvori
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

/*import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import api from "../../../util/api";
import FormLabel from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { render } from 'react-dom';

function RelatedTicketModals() {
  const [relatedId, setRelatedId] = useState(0)
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function FetchTickets() {
    console.log("start")
    api.get("/ticket/related/" + relatedId).then(x => {
      api.post("/ticket/idarray", {"ids": x.data.relatedTicketIds}).then(x2 => {
        setItems(x2.data);
        console.log(items[0])
      })
    })
  }

  useEffect(() => {
    
    
  }, [items]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
      >
        Open Modal
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">This is a test of modal.</p>
        </div>
      </Modal>
    </>
  );


  return (
    <>
    <div>

    </div>
    <Modal show={show} onHide={handleClose} className='my-modal' size="lg">
      <style type="text/css">
          {`
      .btn-flat {
        background-color: #08141c;
        color: white;
        font-size:large;
      }

      .btn-xxl {
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
      }
      `}
        </style>
        <Modal.Header closeButton>
          <Modal.Title>Poveži zahtjeve</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button variant="flat" onClick={handleShow}>
        Launch demo modal
      </Button>

        <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
          <Form.Label size="lg" column="lg" sm="3">
            Sifra zahtjeva
          </Form.Label>
          <Col sm="6">
            <Form.Control size="lg" type="password" placeholder="Šifra zahtjeva" onChange={e => setRelatedId(e.target.value)} />
          </Col>
          <Col>
            <Button variant="flat" onClick={FetchTickets}>
              <FaSearch />
            </Button>
          </Col>
        </Form.Group>

        <table class="tablebig">
          {items.map(item => (
            <>
              <tr key={item.id}>
                <td class="trround">
                  <table class="table1"> 
                    <tr>
                      <td class="td1 tdround"><b>#{item.id}</b></td>
                      <td class="td2 tdround">{new Date(item.date).toLocaleString()}</td>
                    </tr>
                    <tr> 
                      <td class="td3 tdround"><b>{item.title}</b></td>
                      <td class="td4 tdround">{item.createdBy.firstname} {item.createdBy.lastname}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="tdsep"><Button variant="flat" onClick={handleClose}>Poveži</Button></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </>
          ))}
        </table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="flat" onClick={handleClose}>
            Close
          </Button>
          <Button variant="flat" onClick={FetchTickets}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    
   
  );
}

export default RelatedTicketModals;*/