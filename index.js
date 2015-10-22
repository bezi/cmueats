//==============================================================================
// Utility functions for mutating time data.
//==============================================================================

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
var APIFmtToInt  = (time) => (10000 * time.day) + (100 * time.hour) + time.min;

/* @brief Comparison function conforming to Array.prototype.sort() format for
 * comparing two dates in API format.
 *
 * @param dateA Object A time formatted in the API format.
 * @param dateB Object A time formatted in the API format.
 */
var APIFmtCompare = function(dateA, dateB) {
  var a = APIFmtToInt(dateA);
  var b = APIFmtToInt(dateB);
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
  var currTimeInt = APIFmtToInt(dateToAPIFmt(currTime));

  // First, figure out if we're open.
  var isOpen = times
    .map(function (slot) {
      var start = APIFmtToInt(slot.start);
      var end = APIFmtToInt(slot.end);

      // Check to see if the start date is before the end date in the week.
      if (start < end) {
        return (start <= currTimeInt) && (currTimeInt < end);
      } else {
        // Time wraps over Saturday/Sunday boundary.
        return (start <= currTimeInt) || (currTimeInt < end);
      }
    })
    .reduce(function (a, b) { return a || b; }, false);

  // Next, figure out the next time by generating all the relevant times
  // (opening times if we're closed, closing times if we're open).
  var slots = times.map((slot) => APIFmtToInt((isOpen) ? slot.end : slot.start));

  // Keeps track of the first index after the largest time strictly less than
  // the current time.
  var idx = 0;
  for (var i = 0; i < slots.length; ++i) {
    if (slots[i] < currTimeInt) { idx = (i + 1) % slots.length; }
  }

  return {
    isOpen: isOpen,
    nextTime: (isOpen) ? times[idx].end : times[idx].start,
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
  var isSameDay = newDate.getDay() == date.day;
  var isAfter = APIFmtToInt(dateToAPIFmt(newDate)) > APIFmtToInt(date);
    //newDate.getHours() > date.hour || (newDate.getHours() == date.hour && newDate.getMinutes() > date.min);
  if (!isSameDay || (isSameDay && isAfter)) {
    newDate.setDate(newDate.getDate() + (date.day - 1 - newDate.getDay() + 7) % 7 + 1);
  }
  newDate.setHours(date.hour);
  newDate.setMinutes(date.min);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  var locTime = moment(newDate);
  var str = (isOpen) ? "Closes in " : "Opens in ";
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
    }.bind(this))
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
      .sort((a, b) => APIFmtCompare(a.nextTime, b.nextTime));

    var closed = computedData
      .filter((loc) => !loc.isOpen)
      .sort((a, b) => APIFmtCompare(a.nextTime, b.nextTime));

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
