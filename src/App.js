import { Typography, Grid } from "@mui/material";
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

  return (
    <div className="App">
      <Typography variant="h2">{getGreeting()}</Typography>
      <Grid container spacing={1}>
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
      <Grid container spacing={1}>
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
  );
}

export default App;
