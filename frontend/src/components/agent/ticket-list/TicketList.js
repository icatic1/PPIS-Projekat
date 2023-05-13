import React, { useState } from "react";
import Header from "../../shared/header";
import { useEffect } from "react";
import api from "../../../util/api";
import { Container, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { makeStyles } from "@material-ui/core";
import Ticket from "./Ticket";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function TicketList() {
  const [assignedTickets, setAssignedTickets] = useState();
  const [openTickets, setOpenTickets] = useState();
  const [closedTickets, setClosedTickets] = useState();

  const [valueTab, setValueTab] = React.useState("1");
  const [backgroundColorTab, setBackgroundColorTab] = useState([
    "#F5F5F5",
    "#00101F",
    "#00101F",
  ]);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    const newBackgroundColor = backgroundColorTab.map((c, i) => {
      if (i == valueTab - 1) return "#00101F";
      else if (i == newValue - 1) return "#F5F5F5";
      else return c;
    });
    setBackgroundColorTab(newBackgroundColor);
    setValueTab(newValue);
  };

  useEffect(() => {
    api.get("/ticket/agentassigned").then((res) => {
      setAssignedTickets(res.data);
    });
    api.get("/ticket/agentopen").then((res) => {
      setOpenTickets(res.data);
    });
    api.get("/ticket/agentclosed").then((res) => {
      setClosedTickets(res.data);
    });
  }, []);

  return (
    <>
      <Header></Header>
      <Container
        sx={{ mt: 2 }}
        style={{ backgroundColor: "#F5F5F5", padding: 0, width: "80%" }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={valueTab}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                classes={{ indicator: classes.customStyleOnActiveTab }}
                sx={{ backgroundColor: "#00101F" }}
                indicatorColor={""}
              >
                <Tab
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: backgroundColorTab[0],
                    fontFamily: "Yantramanav",
                  }}
                  indicatorColor={""}
                  label={
                    <span
                      className={
                        valueTab == 1
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Vaši aktivni zahtjevi
                    </span>
                  }
                  value="1"
                />
                <Tab
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: backgroundColorTab[1],
                    fontFamily: "Yantramanav",
                  }}
                  label={
                    <span
                      className={
                        valueTab == 2
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Otvoreni zahtjevi
                    </span>
                  }
                  value="2"
                />
                <Tab
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: backgroundColorTab[2],
                    fontFamily: "Yantramanav",
                  }}
                  label={
                    <span
                      className={
                        valueTab == 3
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Zatvoreni zahtjevi
                    </span>
                  }
                  value="3"
                />
              </TabList>
            </Box>

            <TabPanel value="1">
              {assignedTickets != null ? (
                <Ticket ticket={assignedTickets}></Ticket>
              ) : (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </TabPanel>
            <TabPanel value="2">
              {" "}
              <Ticket ticket={openTickets}></Ticket>
            </TabPanel>
            <TabPanel value="3">
              {" "}
              <Ticket ticket={closedTickets}></Ticket>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}

const useStyles = makeStyles({
  customStyleOnTab: {
    fontSize: "1em",
    color: "white",
    fontWeight: "500",
  },
  customStyleOnActiveTab: {
    color: "black",
    backgroundColor: "#F5F5F5",
  },
  activeTab: {
    fontSize: "1em",
    fontWeight: "600",
    color: "black",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    border: "none",
  },
});

export default TicketList;
