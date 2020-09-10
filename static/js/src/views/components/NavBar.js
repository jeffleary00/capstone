const m = require("mithril");

module.exports = {
  view: function() {
    return m("div", [
      m(m.route.Link, {url: "/token"}, "token"),
      m(m.route.Link, {url: "/logout"}, "logout"),
    ]

    ));
  }
}
