//==============================================================================
// Utility functions for mutating time data.
//==============================================================================
'use strict';

/* @brief Returns a function that converts times in API format (a relative time
 * measure) into an absolute time.
 *
 * In particular, this function will convert from the API format into the first
 * date in the future that matches the API format.  The reason this is not a
 * direct function is so that every future invocation of the function will use
 * the same Date.now().
 *
 * @param currTime String The current date serialized.
 */
var getAPIFmtConversion = (currTime) => {
  /* @brief Concert the API Date into the first future date that matches the API
   * date.
   * @param apiDate Object A time formatted in the API format.
   */
  var now = new Date(currTime);

  return function (apiDate) {
    var ret = new Date(now);
    var dateOffset = (apiDate.day + 7 - ret.getDay()) % 7;
    ret.setDate(ret.getDate() + dateOffset);
    ret.setHours(apiDate.hour);
    ret.setMinutes(apiDate.min);
    ret.setSeconds(0);

    // If we're on the same day, the offset will be zero.  This checks if the
    // hour is before us in the day and thus should be pushed to next week.
    if (ret < now) { ret.setDate(ret.getDate() + 7); }

    return ret.toJSON();
  };
};

/* @brief Returns the input time in the same format as the API.
 *
 * @param date String The current time serialized into JSON.
 */
var dateToAPIFmt = function (date) {
  var now = new Date(date);

  return {
    day: now.getDay(),
    hour: now.getHours(),
    min: now.getMinutes()
  };
};

/* @brief Goes from a time formatted in the API format into an integer, for
 * comparison purposes.
 * @param time Object A time formatted in the API format.
 */
var apiFmtToInt  = (time) => 10000 * time.day + 100 * time.hour + time.min;

//==============================================================================
// Utility functions for mutating eatery data.
//==============================================================================

/* @brief For a given eatery's times, generates the tuple (isOpen, nextTime).
 *
 * isOpen: Whether the eatery is currently open.
 * nextTime: If the eatery is closed, when it will open.  If it is open, when
 * it will close.
 *
 * @param eatery Object An eatery, as returned by the API and then whose times
 * are mutated into proper absolute times.
 * @param currTime String The current time, serialized into JSON.
 */
var genEateryMetadata = function (eatery, currTime) {

  var times = eatery.times;
  var currTimeInt = apiFmtToInt(dateToAPIFmt(currTime));

  // First, figure out if we're open.
  var isOpen = times
    .map(function (slot) {
      var start = apiFmtToInt(slot.start);
      var end = apiFmtToInt(slot.end);

      // Check to see if the start date is before the end date in the week.
      if (start < end) {
        return start <= currTimeInt && currTimeInt < end;
      } else {
        // Time wraps over Saturday/Sunday boundary.
        return start <= currTimeInt || currTimeInt < end;
      }
    })
    .reduce(function (a, b) { return a || b; }, false);

  var converter = getAPIFmtConversion(currTime);
  var nextTime = times
		.map(function (slot) {
	    if (isOpen) {
        return converter(slot.end);
      } else {
        return converter(slot.start);
      }
		}).sort()[0];

  return {
    isOpen: isOpen,
    nextTime: nextTime
  };
};

/* @brief Returns the informative string about when the place will reopen or
 * close.
 *
 * @param new String The current time, serialized into JSON.
 * @param isOpen Boolean Whether the eatery is open.
 * @param date Object The next relevant time, in API format.
 */
function getEateryTagline(now, isOpen, date) {

  var locTime = moment(date);
  var str = isOpen ? "Closes " : "Opens ";
  str += locTime.fromNow().charAt(0).toLowerCase() + locTime.fromNow().slice(1);
  str += " (" + locTime.calendar() + ")";

  return str;
}

//==============================================================================
// React templates
//==============================================================================
var Eatery = React.createClass({
  render: function () {
    var message = getEateryTagline(this.props.time,
                                   this.props.eatery.isOpen,
                                   this.props.eatery.nextTime);

    var className;
    if (this.props.eatery.isOpen) {
      className = "open_eatery";
    } else {
      className = "closed_eatery";
    }

    return (
      <div className={className}>
      <h2>{this.props.eatery.name}</h2>
      <p>{this.props.eatery.location}</p>
      <p>{message}</p>
      </div>
    );
  }
});

var EateryList = React.createClass({
  render: function () {
    var eateries = this.props.eateryList
      .map((eatery) =>
        (
          <Eatery key={eatery.name} eatery={eatery} time={this.props.time} />
        )
      );

    return (
      <div className="eateryList">
        {eateries}
      </div>
    );
  }
});

var EateryContainer = React.createClass({
  getInitialState: function() {
    return {
      eateries: [],
      currentTime: (new Date(Date.now())).toJSON(),
    };
  },
  reloadFromServer: function() {
    // Get clean data from the server.
    $.getJSON(this.props.url, (data) =>
      this.setState({
        eateries: data.locations,
        currentTime: (new Date(Date.now())).toJSON(),
      })
    );
  },
  reloadUI: function() {
    // Add explicit reload for when the time goes up.
    this.setState({
      eateries: this.state.eateries,
      currentTime: (new Date(Date.now())).toJSON(),
    });
  },
  componentDidMount: function() {
    var UITimeout = 5 * 1000; // 5 seconds in ms.
    var serverTimeout = 5 * 50 * 1000; // 5 minutes in ms.
    this.reloadFromServer();
    setInterval(this.reloadUI, UITimeout);
    setInterval(this.reloadFromServer, serverTimeout);
  },
  render: function () {
    var computedData = this.state.eateries.map((loc) => {
        var meta = genEateryMetadata(loc, this.state.currentTime);
        loc.isOpen = meta.isOpen;
        loc.nextTime = meta.nextTime;
        return loc;
      });

    var open = computedData
      .filter((loc) => loc.isOpen)
      .sort((a, b) => (new Date(a.nextTime)) - (new Date(b.nextTime)));

    var closed = computedData
      .filter((loc) => !loc.isOpen)
      .sort((a, b) => (new Date(a.nextTime)) - (new Date(b.nextTime)));

    return (
      <div className="eateryContainer">
        <EateryList eateryList={open} time={this.state.currentTime}/>
        <EateryList eateryList={closed} time={this.state.currentTime}/>
      </div>
    );
  }
});

ReactDOM.render(
  (<EateryContainer url="http://apis.scottylabs.org/dining/v1/locations" />),
    document.getElementById('content')
);
