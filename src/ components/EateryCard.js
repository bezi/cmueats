import React from "react";
import {
  Card,
  Typography,
  styled,
  Grid,
  IconButton,
  Button,
} from "@mui/material";

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
  return (
    <Grid item xs={12} md={6} lg={4} xl={4}>
      <StyledCard>
        <Typography>{{ statusMsg }}</Typography>
        <Typography>{{ name }}</Typography>
        <Typography>{{ location }}</Typography>
        <Typography>{{ description }}</Typography>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={6}>
            <Button>Menu</Button>
          </Grid>
          <Grid item xs={6}>
            <Button>Specials</Button>
          </Grid>
        </Grid>
      </StyledCard>
    </Grid>
  );
}
