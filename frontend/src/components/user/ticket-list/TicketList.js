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
function TicketList() {
  const [activeTickets, setActiveTickets] = useState();
  const [processedTickets, setProcessedTickets] = useState();
  const [othersTickets, setOthersTickets] = useState();

  const [valueTab, setValueTab] = React.useState("1");
  const [backgroundColorTab, setBackgroundColorTab] = useState([
    "#D9D9D9",
    "#00101F",
    "#00101F",
  ]);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    const newBackgroundColor = backgroundColorTab.map((c, i) => {
      if (i == valueTab - 1) return "#00101F";
      else if (i == newValue - 1) return "#D9D9D9";
      else return c;
    });
    setBackgroundColorTab(newBackgroundColor);
    setValueTab(newValue);
  };

  useEffect(() => {
    api.get("/ticket/active").then((res) => {
      setActiveTickets(res.data);
    });
    api.get("/ticket/processed").then((res) => {
      setProcessedTickets(res.data);
    });
    api.get("/ticket/others").then((res) => {
      setOthersTickets(res.data);
    });
  }, []);

  return (
    <>
      <Header></Header>
      <Container
        sx={{ mt: 2 }}
        style={{ backgroundColor: "#D9D9D9", padding: 0, width: "80%" }}
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
                  }}
                  label={
                    <span
                      className={
                        valueTab == 2
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Vaši obrađeni zahtjevi
                    </span>
                  }
                  value="2"
                />

                <Tab
                  value="3"
                  label={
                    <span
                      className={
                        valueTab == 3
                          ? classes.activeTab
                          : classes.customStyleOnTab
                      }
                    >
                      Ostali aktivni zahtjevi
                    </span>
                  }
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: backgroundColorTab[2],
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Ticket ticket={activeTickets}></Ticket>
            </TabPanel>
            <TabPanel value="2">
              {" "}
              <Ticket ticket={processedTickets}></Ticket>
            </TabPanel>
            <TabPanel value="3">
              {" "}
              <Ticket ticket={othersTickets}></Ticket>
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
    backgroundColor: "#D9D9D9",
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
