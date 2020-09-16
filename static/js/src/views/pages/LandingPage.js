import {token} from "../../auth";
const m = require("mithril");

let LandingPage = {
  view: function() {
    return [
      m("h2", "Welcome"),
      m("p", "Here is your JWT."),
      m("div", {style: "border: 1px solid black; word-wrap: break-word;"}, token)
    ];
  }
}

export {LandingPage};
