const m = require("mithril");
import {auth0, token} from "../../auth.js";

const NavBar = {
  view: function() {
    let elements = [
      m("span", {style: "float: right;"}, [
        m("button", {
          class: "button small",
          style: "float: right;",
          id: "loginButton",
          onclick: async function() {
            await auth0.loginWithRedirect();
          }}, "Login"),
        m("button", {
          class: "button small",
          style: "float: right;",
          id: "logoutButton",
          style: "display: none;"}, "Logout"),
        m("button", {
          class: "button small",
          style: "float: right;",
          id: "tokenButton",
          style: "display: none;",
          onclick: function() {
            prompt("press ctrl+c to copy the text below", token);
          }}, "Token")
      ]),
      m("div", {class: "title"}, "Capstone Monitor"),
      m(m.route.Link, {
        href: "/dashboard",
        id: "dashboardLink",
        style: "display: none;"}, "dashboard")
    ]

    return m("div", {class: "navbar"}, elements);
  },
  refresh: function() {
    if (token) {
      document.getElementById("loginButton").style.display="none";
      document.getElementById("logoutButton").style.display="block";
      document.getElementById("tokenButton").style.display="block";
      document.getElementById("dashboardLink").style.display="block";
    } else {
      document.getElementById("loginButton").style.display="block";
      document.getElementById("logoutButton").style.display="none";
      document.getElementById("tokenButton").style.display="none";
      document.getElementById("dashboardLink").style.display="none";
    }
  }
}

export {NavBar};
