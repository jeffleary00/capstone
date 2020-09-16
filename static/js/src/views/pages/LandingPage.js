const m = require("mithril");

let LandingPage = {
  view: function() {
    return [
      m("h2", "Welcome"),
      m("div", "Use the Token button in the menu to view/copy your JWT")
    ];
  }
}

export {LandingPage};
