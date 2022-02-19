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
  CardActions,
  Avatar,
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

const NameText = styled(Typography)({
  color: "white",
  padding: 0,
  fontFamily:
    '"Zilla Slab", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  textTransform: "capitalize",
});

const LocationText = styled(Typography)({
  color: "#6C757D",
  marginBottom: "10px",
});

const DescriptionText = styled(Typography)({
  color: "white",
});

const OpenText = styled(Typography)({
  color: "#19b875",
});

const ActionButton = styled(Button)({
  fontFamily:
    '"Zilla Slab", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  color: "white",
  backgroundColor: "#1D1F21",
  elevation: 30,
});

const OpenAvatar = styled(Avatar)({
  "@keyframes blinking": {
    "0%": {
      opacity: 0,
    },

    "50%": {
      opacity: 1,
    },

    "75%": {
      opacity: 1,
    },

    "100%": {
      opacity: 0,
    },

    backgroundColor: "#19b875",
    animationName: "blinking",
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
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
          <StyledCardHeader
            title={<OpenText variant="subtitle1">{statusMsg}</OpenText>}
          ></StyledCardHeader>
          <CardContent>
            <NameText variant="h5">{name}</NameText>
            <LocationText variant="subtitle2">{location}</LocationText>
            <DescriptionText>{description}</DescriptionText>
          </CardContent>
          <CardActions>
            {menuURL && (
              <ActionButton
                onClick={(e) => {
                  window.open(menuURL, "_blank");
                }}
              >
                Menu
              </ActionButton>
            )}
            {todaysSpecials && (
              <ActionButton
                onClick={(e) => {
                  setModalOpen(true);
                }}
              >
                Specials and More
              </ActionButton>
            )}
          </CardActions>
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
