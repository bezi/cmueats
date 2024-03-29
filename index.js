"use strict";

function getEateryTagline(e, t, r) {
  var n = moment(r)
    .tz("America/New_York"),
    a = t ? "Closes " : "Opens ";
  return (
    (a += n.fromNow()
      .charAt(0)
      .toLowerCase() + n.fromNow()
        .slice(1)),
    (a += " (" + n.calendar()
      .toLowerCase() + ")")
  );
}

var getAPIFmtConversion = function (e) {
  var t = new Date(e);
  return function (e) {
    var r = new Date(t),
      n = (e.day + 7 - r.getDay()) % 7;
    return (
      r.setDate(r.getDate() + n),
      r.setHours(e.hour),
      r.setMinutes(e.minute),
      r.setSeconds(0),
      t > r && r.setDate(r.getDate() + 7),
      r.toJSON()
    );
  };
},
  dateToAPIFmt = function (e) {
    var t = new Date(e);
    return {
      day: t.getDay(),
      hour: t.getHours(),
      minute: t.getMinutes(),
    };
  },
  apiFmtToInt = function (e) {
    return 1e4 * e.day + 100 * e.hour + e.minute;
  },
  genEateryMetadata = function (e, t) {
    var r = e.times,
      n = apiFmtToInt(dateToAPIFmt(t)),
      a = r
        .map(function (e) {
          var t = apiFmtToInt(e.start),
            r = apiFmtToInt(e.end);
          return r > t ? n >= t && r > n : n >= t || r > n;
        })
        .reduce(function (e, t) {
          return e || t;
        }, !1),
      i = getAPIFmtConversion(t),
      s = r
        .map(function (e) {
          return i(a ? e.end : e.start);
        })
        .sort()[0];
    return {
      isOpen: a,
      nextTime: s,
    };
  },
  Eatery = React.createClass({
    render: function () {
      var e,
        f,
        t = getEateryTagline(
          this.props.time,
          this.props.eatery.isOpen,
          this.props.eatery.nextTime
        );
      if (this.props.eatery.menu !== undefined) {
        var m = React.createElement("a", {
          className: "menu-text",
          href: this.props.eatery.menu,
        }, this.props.eatery.name.toLowerCase())
      } else {
        m = this.props.eatery.name.toLowerCase();
      };
      console.log(m);
      return (
        (e = this.props.eatery.isOpen ? "open-eatery" : "closed-eatery"),
        (f = this.props.eatery.isOpen ? "open" : "closed"),
        React.createElement(
          "div", {
          className: "card",
        },
          React.createElement(
            "div", {
            className: "card-header",
          },
            React.createElement("span", {
              className: e,
            }),
            React.createElement(
              "span", {
              className: f,
            },
              t
            )
          ),
          React.createElement(
            "div", {
            className: "card-body",
          },
            React.createElement(
              "h5", {
              className: "card-title",
            },
              m
            ),
            React.createElement(
              "p", {
              className: "card-subtitle pb-2 tagline text-muted",
            },
              this.props.eatery.location
            ),
            React.createElement(
              "p", {
              className: "card-text",
            },
              this.props.eatery.short_description
            ),
          )
        )
      );
    },
  }),
  EateryList = React.createClass({
    render: function () {
      var e = this,
        t = this.props.eateryList.map(function (t) {
          if (t.name.length > 0) {
            return React.createElement(Eatery, {
              key: t.name,
              eatery: t,
              time: e.props.time,
            });
          }
        });
      return React.createElement(
        "div", {
        className: "eateryList card-columns",
      },
        t
      );
    },
  }),
  EateryContainer = React.createClass({
    getInitialState: function () {
      return {
        eateries: [],
        currentTime: new Date(Date.now())
          .toJSON(),
      };
    },
    reloadFromServer: function () {
      var e = this;
      $.getJSON(this.props.url, function (t) {
        return e.setState({
          eateries: t.locations,
          currentTime: new Date(Date.now())
            .toJSON(),
        });
      });
    },
    reloadUI: function () {
      this.setState({
        eateries: this.state.eateries,
        currentTime: new Date(Date.now())
          .toJSON(),
      });
    },
    componentDidMount: function () {
      var e = 5e3,
        t = 25e4;
      this.reloadFromServer(),
        setInterval(this.reloadUI, e),
        setInterval(this.reloadFromServer, t);
    },
    render: function () {
      var e = this,
        t = this.state.eateries.map(function (t) {
          var r = genEateryMetadata(t, e.state.currentTime);
          return (t.isOpen = r.isOpen), (t.nextTime = r.nextTime), t;
        }),
        r = t
          .filter(function (e) {
            return e.isOpen;
          })
          .sort(function (e, t) {
            return new Date(e.nextTime) - new Date(t.nextTime);
          }),
        n = t
          .filter(function (e) {
            return !e.isOpen;
          })
          .sort(function (e, t) {
            return new Date(e.nextTime) - new Date(t.nextTime);
          });
      return React.createElement(
        "div", {
        className: "eateryContainer",
      },
        React.createElement(EateryList, {
          eateryList: r,
          time: this.state.currentTime,
          className: "pt-5",
        }),
        React.createElement(EateryList, {
          eateryList: n,
          time: this.state.currentTime,
        })
      );
    },
  });

ReactDOM.render(
  React.createElement(EateryContainer, {
    url: "https://dining.apis.scottylabs.org/locations",
  }),
  document.getElementById("content")
);
