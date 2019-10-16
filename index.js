"use strict";

function getEateryTagline(e, t, r) {
  var n = moment(r).tz("America/New_York"),
    a = t ? "Closes " : "Opens ";
  return (
    (a +=
      n
        .fromNow()
        .charAt(0)
        .toLowerCase() + n.fromNow().slice(1)),
    (a += " (" + n.calendar() + ")")
  );
}
var getAPIFmtConversion = function(e) {
    var t = new Date(e);
    return function(e) {
      var r = new Date(t),
        n = (e.day + 7 - r.getDay()) % 7;
      return (
        r.setDate(r.getDate() + n),
        r.setHours(e.hour),
        r.setMinutes(e.min),
        r.setSeconds(0),
        t > r && r.setDate(r.getDate() + 7),
        r.toJSON()
      );
    };
  },
  dateToAPIFmt = function(e) {
    var t = new Date(e);
    return {
      day: t.getDay(),
      hour: t.getHours(),
      min: t.getMinutes()
    };
  },
  apiFmtToInt = function(e) {
    return 1e4 * e.day + 100 * e.hour + e.min;
  },
  genEateryMetadata = function(e, t) {
    var r = e.times,
      n = apiFmtToInt(dateToAPIFmt(t)),
      a = r
        .map(function(e) {
          var t = apiFmtToInt(e.start),
            r = apiFmtToInt(e.end);
          return r > t ? n >= t && r > n : n >= t || r > n;
        })
        .reduce(function(e, t) {
          return e || t;
        }, !1),
      i = getAPIFmtConversion(t),
      s = r
        .map(function(e) {
          return i(a ? e.end : e.start);
        })
        .sort()[0];
    return {
      isOpen: a,
      nextTime: s
    };
  },
  Eatery = React.createClass({
    render: function() {
      var e,
        t = getEateryTagline(
          this.props.time,
          this.props.eatery.isOpen,
          this.props.eatery.nextTime
        );
      return (
        (e = this.props.eatery.isOpen ? "open_eatery" : "closed_eatery"),
        React.createElement(
          "div",
          {
            className: "card"
          },
          React.createElement(
            "h5",
            {
              className: "card-title"
            },
            this.props.eatery.name,
            React.createElement("span", {
              className: e
            })
          ),
          React.createElement(
            "h6",
            {
              className: "card-subtitle mb-2 text-muted"
            },
            this.props.eatery.location
          ),
          React.createElement(
            "p",
            {
              className: "card-text"
            },
            t
          )
        )
      );
    }
  }),
  EateryList = React.createClass({
    render: function() {
      var e = this,
        t = this.props.eateryList.map(function(t) {
          if (t.name.length > 0) {
            return React.createElement(Eatery, {
              key: t.name,
              eatery: t,
              time: e.props.time
            });
          }
        });
      return React.createElement(
        "div",
        {
          className: "eateryList"
        },
        t
      );
    }
  }),
  EateryContainer = React.createClass({
    getInitialState: function() {
      return {
        eateries: [],
        currentTime: new Date(Date.now()).toJSON()
      };
    },
    reloadFromServer: function() {
      var e = this;
      $.getJSON(this.props.url, function(t) {
        return e.setState({
          eateries: t.locations,
          currentTime: new Date(Date.now()).toJSON()
        });
      });
    },
    reloadUI: function() {
      this.setState({
        eateries: this.state.eateries,
        currentTime: new Date(Date.now()).toJSON()
      });
    },
    componentDidMount: function() {
      var e = 5e3,
        t = 25e4;
      this.reloadFromServer(),
        setInterval(this.reloadUI, e),
        setInterval(this.reloadFromServer, t);
    },
    render: function() {
      var e = this,
        t = this.state.eateries.map(function(t) {
          var r = genEateryMetadata(t, e.state.currentTime);
          return (t.isOpen = r.isOpen), (t.nextTime = r.nextTime), t;
        }),
        r = t
          .filter(function(e) {
            return e.isOpen;
          })
          .sort(function(e, t) {
            return new Date(e.nextTime) - new Date(t.nextTime);
          }),
        n = t
          .filter(function(e) {
            return !e.isOpen;
          })
          .sort(function(e, t) {
            return new Date(e.nextTime) - new Date(t.nextTime);
          });
      return React.createElement(
        "div",
        {
          className: "eateryContainer card-columns"
        },
        React.createElement(EateryList, {
          eateryList: r,
          time: this.state.currentTime
        }),
        React.createElement(EateryList, {
          eateryList: n,
          time: this.state.currentTime
        })
      );
    }
  });
ReactDOM.render(
  React.createElement(EateryContainer, {
    url: "https://apis.scottylabs.org/dining/v1/locations"
  }),
  document.getElementById("content")
);
