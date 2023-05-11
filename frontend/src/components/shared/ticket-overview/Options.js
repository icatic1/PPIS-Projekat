import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../util/api";
import authService from "../../../util/auth.service";
import TicketForwardModal from "../../agent/ticket-forward/TicketForwardModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Options({ ticket }) {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const [verifyAlert, setVerifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [open, setOpen] = useState(false);

  const handleVerify = () => {
    api.post("/ticket/verify/" + ticket.id).then(() => {
      setAlertMessage("Uspješno ste potvrdili rješenje!");
      setVerifyAlert(true);
      setTimeout(() => {
        navigate("/ticket-list");
      }, 3000);
    });
  };

  const handleDelete = () => {
    api.delete("ticket/" + ticket.id).then(() => {
      setAlertMessage("Uspješno ste obrisali zahtjev!");
      setVerifyAlert(true);
      setTimeout(() => {
        navigate("/ticket-list");
      }, 3000);
    });
  };

  const handleModalForward = () => {
    setOpen(true);
  };

  return (
    <>
      <Snackbar
        open={verifyAlert}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert sx={{ width: "100%" }} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
      {user.role == "sd_user" ? (
        <ButtonGroup style={{ float: "right", margin: 0 }}>
          {ticket.status == "ACTIVE" ? (
            <Button
              style={{
                backgroundColor: "#ff5252",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
              onClick={handleDelete}
            >
              Izbriši zahtjev
            </Button>
          ) : ticket.status == "ASSIGNED" ? (
            <Button
              style={{
                backgroundColor: "#00101F",
                padding: "5px 20px 5px 20px",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
              onClick={handleVerify}
            >
              Potvrdi rješenje
            </Button>
          ) : (
            <div></div>
          )}
        </ButtonGroup>
      ) : (
        <div>
          <ButtonGroup style={{ float: "right", margin: 0 }}>
            <Button
              style={{
                backgroundColor: "#00101f",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
              onClick={handleModalForward}
            >
              Proslijedi zahtjev
            </Button>
            <Button
              style={{
                backgroundColor: "#00101F",
                padding: "5px 20px 5px 20px",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
            >
              Poveži zahtjeve
            </Button>
            <Button
              style={{
                backgroundColor: "#ff5252",
                padding: "5px 20px 5px 20px",
                textTransform: "none",
                fontFamily: "Yantramanav",
                fontWeight: "500",
                fontSize: "15px",
                color: "white",
                height: "30px",
              }}
            >
              Zatvori zahtjev
            </Button>
          </ButtonGroup>
          <TicketForwardModal
            open={open}
            setOpen={setOpen}
            ticketid={ticket.id}
          ></TicketForwardModal>
        </div>
      )}
    </>
  );
}

export default Options;
