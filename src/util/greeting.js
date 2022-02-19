var hours = new Date().getHours();
var graveyard = [
  "Staying up all night?",
  "Want a late-night snack?",
  "Don't stay up too late!",
  "Delivery too expensive?",
];
var morning = [
  "Fancy some breakfast?",
  "Is breakfast really the most important meal of the day?",
  "What do you want to eat?",
  "Have a good morning!",
];
var afternoon = [
  "What do you want for lunch?",
  "What do you want to eat?",
  "Have a good afternoon!",
  "Use those blocks!",
];
var evening = [
  "What do you want for dinner?",
  "What do you want to eat?",
  "Have a good evening!",
  "Grab a bite to eat!",
];

const getGreeting = () => {
  let message = "Welcome to CMUEats!";
  if (hours >= 0 && hours < 6) {
    message = graveyard[Math.floor(Math.random() * graveyard.length)];
  } else if (hours >= 6 && hours < 12) {
    message = morning[Math.floor(Math.random() * morning.length)];
  } else if (hours >= 12 && hours < 17) {
    message = afternoon[Math.floor(Math.random() * afternoon.length)];
  } else if (hours >= 17 && hours < 24) {
    message = evening[Math.floor(Math.random() * evening.length)];
  }

  return message;
};
