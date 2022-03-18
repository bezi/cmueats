import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  styled,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
  CardActions,
  Avatar,
  Dialog,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledCard = styled(Card)({
  backgroundColor: "#23272A",
  border: "2px solid rgba(0, 0, 0, 0.2)",
  textAlign: "left",
  borderRadius: 7,
  height: "100%",
  justifyContent: "flex-start"
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

const ClosedText = styled(Typography)({
  color: "#dd3c18",
});

const ActionButton = styled(Button)({
  fontFamily:
    '"Zilla Slab", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  color: "white",
  backgroundColor: "#1D1F21",
  elevation: 30,
});

const GreenDot = styled(Card)({
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
  },
  background: "#19b875",
  width: "100%",
  height: "100%",
  foregroundColor: "#19b875",
  animationName: "blinking",
  animationDuration: "1s",
  animationIterationCount: "infinite",
});

const RedDot = styled(Card)({
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
  },
  background: "#dd3c18",
  width: "100%",
  height: "100%",
  foregroundColor: "#dd3c18",
  animationName: "blinking",
  animationDuration: "1s",
  animationIterationCount: "infinite",
});

const SpecialsContent = styled(Accordion)({
  backgroundColor: "#23272A",
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
      <Grid item xs={12} md={6} lg={3} xl={3}>
        <StyledCard>
          <StyledCardHeader
            title={
              isOpen ? (
                <OpenText variant="subtitle1">{statusMsg}</OpenText>
              ) : (
                <ClosedText variant="subtitle1">{statusMsg}</ClosedText>
              )
            }
            avatar={
              <Avatar
                sx={{ width: 12, height: 12, backgroundColor: "#1D1F21" }}
              >
                {isOpen ? <GreenDot /> : <RedDot />}
              </Avatar>
            }
          ></StyledCardHeader>
          <CardContent>
            <NameText variant="h6">{name}</NameText>
            <LocationText variant="subtitle2">{location}</LocationText>
            <DescriptionText>{description}</DescriptionText>
          </CardContent>
          <CardActions sx={{ marginTop: "auto" }}>
            {menuURL && (
              <ActionButton
                onClick={(e) => {
                  window.open(menuURL, "_blank");
                }}
              >
                Menu
              </ActionButton>
            )}
            {(todaysSpecials.length !== 0 || todaysSoups.length !== 0) && (
              <ActionButton
                onClick={(e) => {
                  setModalOpen(true);
                }}
              >
                Specials, Soups & More
              </ActionButton>
            )}
          </CardActions>
        </StyledCard>
      </Grid>

      <Dialog
        open={modalOpen}
        onClose={(e) => {
          setModalOpen(false);
        }}
        PaperProps={{
          style: {
            backgroundColor: "#23272A",
          },
        }}
      >
        <StyledCard>
          <StyledCardHeader
            title={
              isOpen ? (
                <OpenText variant="subtitle1">{statusMsg}</OpenText>
              ) : (
                <ClosedText variant="subtitle1">{statusMsg}</ClosedText>
              )
            }
            avatar={
              <Avatar
                sx={{ width: 12, height: 12, backgroundColor: "#1D1F21" }}
              >
                <GreenDot />
              </Avatar>
            }
          ></StyledCardHeader>
          <CardContent>
            <NameText variant="h6">{name}</NameText>
            <LocationText variant="subtitle2">{location}</LocationText>
          </CardContent>
          {todaysSpecials.concat(todaysSoups).map((special) => {
            return (
              <SpecialsContent style={{}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <DescriptionText>{special.title}</DescriptionText>
                </AccordionSummary>
                <AccordionDetails>
                  <LocationText>{special.description}</LocationText>
                </AccordionDetails>
              </SpecialsContent>
            );
          })}
        </StyledCard>
      </Dialog>
    </>
  );
}
