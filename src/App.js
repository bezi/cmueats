import { Typography, Grid, Badge, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import EateryCard from "./ components/EateryCard";
import "./App.css";
import getGreeting from "./util/greeting";
import queryLocations from "./util/queryLocations";

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    queryLocations().then((parsedLocations) => {
      console.log(parsedLocations);
      if (parsedLocations != null) {
        setLocations(parsedLocations);
      }
    });
  }, []);

  const openLocations = locations.filter((location) => location.isOpen);
  const closedLocations = locations.filter((location) => !location.isOpen);

  const HeaderText = styled(Typography)({
    color: "white",
    padding: 0,
    fontFamily:
      '"Zilla Slab", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontWeight: 800,
  });

  const LogoText = styled(Typography)({
    color: "#dd3c18",
    padding: 0,
    fontFamily:
      '"Zilla Slab", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontWeight: 800,
  });

  const FooterText = styled(Typography)({
    color: "white",
    marginBottom: 20,
    fontSize: 16,
  });

  const NewBadge = styled(Badge)({
    fontFamily:
      '"Zilla Slab", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontWeight: 800,
    marginLeft: 20,
    marginRight: 25,
    marginBottom: 4,
    color: "#19b875",
  });

  return (
    <div className="App">
      <div className="Container">
        <HeaderText variant="h3">{getGreeting()}</HeaderText>
        <br></br>
        <HeaderText variant="subtitle1">
          <NewBadge
            badgeContent={<HeaderText variant="body2">New</HeaderText>}
            color="success"
          ></NewBadge>
          You can directly browse menus, specials, soups and more at supported
          locations
        </HeaderText>
        <br></br>
        <br></br>
        <Grid container spacing={2}>
          {openLocations.map(
            (
              {
                name,
                location,
                isOpen,
                short_description,
                todaysSpecials,
                menu,
                acceptsOnlineOrders,
                statusMsg,
                todaysSoups,
              },
              index
            ) => (
              <EateryCard
                name={name}
                location={location}
                isOpen={isOpen}
                description={short_description}
                menuURL={menu}
                acceptsOnlineOrders={acceptsOnlineOrders}
                statusMsg={statusMsg}
                todaysSpecials={todaysSpecials || []}
                todaysSoups={todaysSoups || []}
                key={index}
              />
            )
          )}
        </Grid>
        <br></br>
        <Grid container spacing={2}>
          {closedLocations.map(
            (
              {
                name,
                location,
                isOpen,
                short_description,
                todaysSpecials,
                menu,
                acceptsOnlineOrders,
                statusMsg,
                todaysSoups,
              },
              index
            ) => (
              <EateryCard
                name={name}
                location={location}
                isOpen={isOpen}
                description={short_description}
                menuURL={menu}
                acceptsOnlineOrders={acceptsOnlineOrders}
                statusMsg={statusMsg}
                todaysSpecials={todaysSpecials || []}
                todaysSoups={todaysSoups || []}
                key={index}
              />
            )
          )}
        </Grid>
      </div>
      <footer className="footer">
        <FooterText>
          All times displayed in Pittsburgh local time (GMT -4)
        </FooterText>
        <FooterText>
          Contact{" "}
          <a href="mailto:gramliu@cmu.edu" style={{ color: "white" }}>
            Gram
          </a>
          ,{" "}
          <a href="mailto:anuda@cmu.edu" style={{ color: "white" }}>
            Anuda
          </a>
          , or{" "}
          <a href="mailto:dsyou@andrew.cmu.edu" style={{ color: "white" }}>
            David
          </a>{" "}
          with any problems
        </FooterText>
        <LogoText variant="h4">
          cmu<span style={{ color: "#19b875" }}>:eats</span>
        </LogoText>
      </footer>
    </div>
  );
}

export default App;
