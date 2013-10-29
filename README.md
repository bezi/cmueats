cmueats
=======

Webapp for finding when Carnegie Mellon University's many eating locations are open.
Implemented with Django and hosted on heroku.

Currently hosted at [cmueats.com](http://www.cmueats.com).  

Written by Oscar Bezi, Justin Gallagher, and Kirn Hans at the 2013 HackCMU Hackathon.  
Maintained by Oscar and Justin.

todo
----
- Times to open and close
- Google map API integration
- Tags/types of food
- Search function
- Countdown timer to open and close
- Mobile apps for iOS and Android
- Parsing schedule from CMU web page, not hard-coded
- Database, not dictionary


debug instructions
------------------

Run a local server using the following commands:

1. Create a virtual environment (only needs to be done once) 

  `virtualenv venv --distribute` 

2. Source the virtual environment

  `source venv/bin/activate`
  
3. If this is the first time, use pip to install dependencies.

  `pip install -r requirements.txt`

3. Collect the static files

  `python manage.py collectstatic`

4. Run the server

  `python manage.py runserver`

5. Open `localhost:8000` in your browser of choice.
