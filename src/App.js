import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EateryCard from "./ components/EateryCard";
import "./App.css";
import getGreeting from "./util/greeting";
import queryLocations from "./util/queryLocations";

function App() {
  const specials = [
    {
      title: "Grubhub only on weekends",
      description:
        "This location is Grubhub only on Saturdays and Sundays!  4:30--8:30pm",
    },
    {
      title: "Spring Semester Hours BACK BAR GRILL",
      description:
        "Monday --Friday  11:00am--11:00pm\r\nGrub Hub Monday --Friday  11:30am--10:30pm",
    },
    {
      title: "Pittsburgh Sandwich and Jalapeno Poppers",
      description: "Fried Chicken\r\nColeslaw\r\nChipotle Mayo\r\nFrench Fries",
    },
  ];

  const soups = [
    {
      title: "Chicken Noodle Soup",
    },
  ];

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    queryLocations().then((parsedLocations) => {
      setLocations(parsedLocations);
    })
  }, []);

  return (
    <div className="App">
      <Typography variant="h2">{getGreeting()}</Typography>
      <EateryCard
        todaysSpecials={specials}
        name="Back Bar Grill"
        location="Cohon Center, Second Floor"
        isOpen={true}
        description="Unique, hand-crafted signature sandwiches and burgers"
        menuURL="https://apps.studentaffairs.cmu.edu/dining/conceptinfo/conceptAssets/menus/F21WebsiteMenu_BackBarGrill-v2.pdf"
        acceptsOnlineOrders={true}
        statusMsg="Closes in 4 hours (today at 8:00 pm)"
        todaysSoups={soups}
      />
    </div>
  );
}

export default App;
