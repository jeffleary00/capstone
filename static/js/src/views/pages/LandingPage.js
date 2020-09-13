const m = require("mithril");
let LandingPage = {
  view: function() {
    return m("div", {class: "main"}, [
      m("p", "Capstone Monitor is a datacenter/server health monitoring application."),
      m("p", "After login, you can click on the Token button, to view the contents of your authenticated jwt.")
    ]);
  }
}

export {LandingPage};
