const m = require("mithril");

const Title = {
  view: function() {
    return m("div", m("h2",
      m(m.route.Link, {url: "/"}, "Capstone Datacenter Monitor")
    ));
  }
}

export {Title};
