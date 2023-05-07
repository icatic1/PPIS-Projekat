import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dateFormat from 'dateformat';
import { Container, Paper } from '@mui/material';
import { useState,useEffect } from 'react';

function History({ ticketComments }) {

    const [commentPage, setCommentPage] = useState([]);
    const [page, setPage] = useState(1);
    const commentsPerPage = 1;

    useEffect((
        () => { goToPage(1) }
    ), [ticketComments])

    const handleChange = (event, value) => {
        goToPage(value);
        setPage(value);
    };

    const goToPage = (p) => {
        setCommentPage(ticketComments.slice((p - 1) * commentsPerPage, (p - 1) * commentsPerPage + commentsPerPage))
    }

    return (
        <><div>
            <span style={{ marginLeft: "3%", fontSize: "180%", fontWeight: "bold", color: "#00101f", fontFamily: "Yantramanav" }}>Historija</span>
            <hr
                style={{ marginLeft: "3%", backgroundColor: "#00101f", width: "90%" }}
            ></hr>
        </div>
            <Container style={{ marginLeft: "3%", width: "90%", backgroundColor: "#00101f", padding: 20 }}>
                {commentPage.map(tc =>
                    <Paper style={{ padding: 15, marginBottom: 20, height: "auto", backgroundColor: "white", fontFamily: "Yantramanav", overflow: "hidden" }}>
                        <span style={{ fontWeight: "bold", float: "right" }}>{dateFormat(tc.dateTime, "dd/mm/yyyy, H:MM")}</span>
                        <span style={{ clear: "both", float: "left" }}>{tc.comment}</span>
                        <span style={{ fontWeight: "bold", clear: "both", float: "right" }}>{tc.createdBy.firstname} {tc.createdBy.lastname}</span>
                    </Paper>)}
                <Stack spacing={2}>
                    <div style={{ justifyContent: "center", display: "flex" }}>
                        <Pagination
                            color="primary"
                            onChange={handleChange}
                            page={page}
                            count={ticketComments.length / commentsPerPage}
                            renderItem={(item) => (
                                <PaginationItem

                                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {...item}
                                />
                            )}
                        />
                    </div>
                </Stack>
            </Container>
        </>
    )
}

export default History