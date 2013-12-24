cmueats
=======

Webapp for finding when Carnegie Mellon University's many eating locations are open.
Implemented with Node.js and Express and hosted on Heroku.

Currently hosted at [cmueats.com](http://www.cmueats.com).  

Written by Oscar Bezi, Justin Gallagher, and Kirn Hans at the 2013 HackCMU Hackathon.  
Maintained by Oscar and Justin.

todo
----
- ~~Times to open and close~~
- ~~Port to Node.js~~
- ~~Countdown timer to open and close~~
- ~~Database, not dictionary~~
- Google map API integration
- Tags/types of food
- Search function
- Mobile apps for iOS and Android
- Parsing schedule from CMU web page, not hard-coded
- Make 404/500 page pretty


debug instructions
------------------

Run a local server using the following commands:

1. Pull the github repository and `cd` to the root of repository

2. If this is the first time, use npm to install dependencies.

  `npm install`

3. Run the server

  `node app.js`

4. Open `localhost:3000` in your browser of choice.
