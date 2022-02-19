import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Typography } from "@mui/material";
import getGreeting from "./util/greeting";
import EateryCard from "./ components/EateryCard";
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
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2">{getGreeting()}</Typography>
      </header>
      <EateryCard
        todaysSpecials={specials}
        name="Back Bar Grill"
        location="Cohon Center, Second Floor"
        isOpen={true}
        description="a mere 100 miles east of campus! Pair your favorite selections – including Chicken Tenders or the hefty Back Bar Burger - with fresh-fried fries for a taste experience unlike any other. And for a limited time, drop by for the soon-to-be-famous Pittsburgh Fried Chicken Sandwich with fries, coleslaw and a zesty chipotle mayo RIGHT ON a brioche bun! This location is Grubhub only on Saturdays and Sundays! 4:30--8:30pm"
        menuURL="https://apps.studentaffairs.cmu.edu/dining/conceptinfo/conceptAssets/menus/F21WebsiteMenu_BackBarGrill-v2.pdf"
        acceptsOnlineOrders={true}
        statusMsg="Closes in 4 hours (today at 8:00 pm)"
        todaysSoups={soups}
      />
    </div>
  );
}

export default App;
