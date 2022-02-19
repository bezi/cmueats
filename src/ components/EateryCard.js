import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  styled,
  Grid,
  Modal,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledCard = styled(Card)({
  backgroundColor: "#23272A",
  border: "2px solid rgba(0, 0, 0, 0.2)",
  textAlign: "left",
});

const StyledCardHeader = styled(CardHeader)({
  fontWeight: 500,
  backgroundColor: "#1D1F21",
});

export default function EateryCard({
  name,
  location,
  description,
  menuURL,
  todaysSpecials,
  acceptsOnlineOrders,
  isOpen,
  statusMsg,
  todaysSoups,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Grid item xs={12} md={6} lg={4} xl={4}>
        <StyledCard>
          <StyledCardHeader title={statusMsg}></StyledCardHeader>
          <CardContent>
            <Typography>{name}</Typography>
            <Typography>{location}</Typography>
            <Typography>{description}</Typography>
            <Grid container alignItems="center" justify="center">
              {menuURL && (
                <Grid item>
                  <Button
                    onClick={(e) => {
                      window.open(menuURL, "_blank");
                    }}
                  >
                    Menu
                  </Button>
                </Grid>
              )}
              {todaysSpecials && (
                <Grid item>
                  <Button
                    onClick={(e) => {
                      setModalOpen(true);
                    }}
                  >
                    View Specials and More
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </StyledCard>
      </Grid>

      {/* <Modal
        open={modalOpen}
        onClose={(e) => {
          setModalOpen(false);
        }}
      >
        <Typography>{statusMsg}</Typography>
        <Typography>{name}</Typography>
        <Typography>{location}</Typography>
        {todaysSpecials.map((special) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{special.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{special.description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Modal> */}
    </>
  );
}
