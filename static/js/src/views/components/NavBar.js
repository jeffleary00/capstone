const m = require("mithril");

const NavBar = {
  view: function() {
    return m("div", [
      m(m.route.Link, {url: "/token"}, "token"),
      m(m.route.Link, {url: "/logout"}, "logout"),
    ]

    ));
  }
}

export {NavBar};
