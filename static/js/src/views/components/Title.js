const m = require("mithril");

module.exports = {
  view: function() {
    return m("div", m("h2",
      m(m.route.Link, {url: "/"}, "Capstone Datacenter Monitor")
    ));
  }
}
