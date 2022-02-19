import React from "react";
import { Card, Typography, styled, Grid } from "@mui/material";

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
  closeMsg,
}) {
  return (
    <Grid item xs={12} md={6} lg={4} xl={4}>
      <StyledCard>
        <Typography></Typography>
      </StyledCard>
    </Grid>
  );
}
