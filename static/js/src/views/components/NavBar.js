const m = require("mithril");
import {auth0, token} from "../../auth.js";

const NavBar = {
  view: function() {
    if (!token) {
      return m("div", {class: "navbar"}, [
        m("button", {
          class: "button",
          style: "float: right;",
          id: "loginButton",
          onclick: async function() {
            await auth0.loginWithRedirect();
          }
        }, "Login"),
        m("div", {class: "title"}, "Capstone Monitor")
      ]);
    } else {
      return m("div", {class: "navbar"}, [
        m("button.button", {
          class: "small",
          style: "float: right;",
          id: "logoutButton"}, "Logout"),
        m("button", {
          class: "button",
          style: "float: right;",
          id: "cookieButton"}, "Token"),
        m("div", {class: "title"}, "Capstone Monitor"),
        m(m.route.Link, {href: "/dashboard"}, "dashboard")
      ]);
    }
  }
}

export {NavBar};
