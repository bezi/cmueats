//==============================================================================
// Utility functions for mutating time data.
//==============================================================================
'use strict';

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

/* @brief Comparison function conforming to Array.prototype.sort() format for
 * comparing two dates in API format.
 *
 * @param dateA Object A time formatted in the API format.
 * @param dateB Object A time formatted in the API format.
 */
var apiFmtCompare = function(dateA, dateB) {
  var a = apiFmtToInt(dateA);
  var b = apiFmtToInt(dateB);
  return a - b;
};

//==============================================================================
// Utility functions for mutating eatery data.
//==============================================================================

/* @brief For a given eatery's times, generates the tuple (isOpen, nextTime).
 *
 * isOpen: Whether the eatery is currently open.
 * nextTime: If the eatery is closed, when it will open.  If it is open, when
 * it will close.
 *
 * @param eatery Object An eatery, as returned by the API.
 * @param currTime String The current time, serialized into JSON.
 */
var genEateryMetadata = function (eatery, currTime) {

  var times = eatery.times;
  var currTimeInt = apiFmtToInt(dateToAPIFmt(currTime));

  var isOpen = false;
  var idx = 0;

  for (var i = 0; i < times.length; ++i) {
    var slot = times[i];

    var startTime = apiFmtToInt(slot.start);
    var endTime = apiFmtToInt(slot.end);

    if (startTime <= currTimeInt && currTimeInt < endTime) {
      isOpen = true;
      idx = i;
      break;
    } else if (startTime > currTimeInt) {
      idx = i;
      break;
    }
  }

  return {
    isOpen: isOpen,
    nextTime: isOpen ? times[idx].end : times[idx].start,
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
  var newDate = new Date(now);
  var isSameDay = newDate.getDay() === date.day;
  var isAfter = apiFmtToInt(dateToAPIFmt(newDate)) > apiFmtToInt(date);
  if (!isSameDay || (isSameDay && isAfter)) {
    newDate.setDate(newDate.getDate() + (date.day - 1 - newDate.getDay() + 7) % 7 + 1);
  }
  newDate.setHours(date.hour);
  newDate.setMinutes(date.min);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  var locTime = moment(newDate);
  var str = isOpen ? "Closes in " : "Opens in ";
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
      .map(function (eatery) {
        return (
          <Eatery key={eatery.name} eatery={eatery} time={this.props.time} />
        );
      }.bind(this));

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
    $.getJSON(this.props.url, function (data) {
      this.setState({
        eateries: data.locations,
        currentTime: (new Date(Date.now())).toJSON(),
      });
    }.bind(this));
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

    var computedData = this.state.eateries.map(function (loc) {
        var meta = genEateryMetadata(loc, this.state.currentTime);
        loc.isOpen = meta.isOpen;
        loc.nextTime = meta.nextTime;
        return loc;
      }.bind(this));

    var open = computedData
      .filter((loc) => loc.isOpen)
      .sort((a, b) => apiFmtCompare(a.nextTime, b.nextTime));

    var closed = computedData
      .filter((loc) => !loc.isOpen)
      .sort((a, b) => apiFmtCompare(a.nextTime, b.nextTime));

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
