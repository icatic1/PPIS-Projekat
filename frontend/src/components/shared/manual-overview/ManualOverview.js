import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../header';
import { useEffect } from 'react';
import api from "../../../util/api"
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from '@mui/material';
import NotFound from '../NotFound';
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function ManualOverview() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [manual, setManual] = useState();
  const [idInvalid, setIdInvalid] = useState(false)

  const navigate = useNavigate()

  var mounted = false;
  useEffect(() => {
    if (!mounted) {
      mounted = true;
      if (id != null) {
        api.get('/manual/' + id).then((res) => {
          if (res.status == 200) {
            setManual(res.data)
          } else {
            setIdInvalid(true)
          }
        })
      }
    }
  }, [])

  const breadcrumbs = [
    <Link underline="hover" key="1" color="#00101f" href="/" onClick={(e) => { e.preventDefault(); navigate("/manual-list") }}>
      Priručnici
    </Link>,
    <Typography key="3" color="text.primary">
      {manual ? manual.title : ""}
    </Typography>,
  ];

  return (
    <div>
      <Header></Header>

      {idInvalid ? <NotFound></NotFound>
        : manual ?
          <>
            <div style={{ marginLeft: "5%", marginTop: "30px" }}>
              <Stack spacing={2}>
                <Breadcrumbs
                  separator={<NavigateNextIcon style={{ color: "#00101f" }} fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </Stack>
            </div>
            <Container
              sx={{ mt: 2 }}
              style={{ backgroundColor: "#F5F5F5", padding: 10, width: "90%", fontFamily: "Yantramanav" }}>
              <div style={{ color: "#00101F", paddingLeft: 10, fontSize: "36px", fontWeight: "bold" }}>{manual.title}</div>
              <hr style={{ backgroundColor: "#00101F" }}></hr>
              <div contentEditable='true' dangerouslySetInnerHTML={{ __html: manual.content }}></div>
            </Container>
          </>
          :
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>}
    </div>
  )
}

export default ManualOverview