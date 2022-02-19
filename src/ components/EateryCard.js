import React, { useState } from "react";
import {
  Card,
  Typography,
  styled,
  Grid,
  Modal,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledCard = styled(Card)({
  borderRadius: "50%",
  backgroundColor: "#eee",
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
          <Typography>{{ statusMsg }}</Typography>
          <Typography>{{ name }}</Typography>
          <Typography>{{ location }}</Typography>
          <Typography>{{ description }}</Typography>
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
        </StyledCard>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Typography>{{ statusMsg }}</Typography>
        <Typography>{{ name }}</Typography>
        <Typography>{{ location }}</Typography>

        {todaysSpecials.map((special) => {
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
          </Accordion>;
        })}
      </Modal>
    </>
  );
}
