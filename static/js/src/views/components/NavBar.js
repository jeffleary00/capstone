const m = require("mithril");
import {auth0, token, hasPermission} from "../../auth.js";

const NavBar = {
  view: function() {
    let elements = [
      m(m.route.Link, {
        href: "/",
        class: "brand"
      }, m("span", "Capstone Monitor")),
      m("input", {
        id: "bmenub",
        type: "checkbox",
        class: "show"
      }),
      m("label", {
        class: "burger pseudo button",
        for: "bmenub",
      }, "menu"),
      m("div", {class: "menu"}, [
        m(m.route.Link, {
          class: "button pseudo small",
          href: "/dashboard",
          id: "dashboardLink",
          style: "display: none;"}, "Dashboard"),
        m(m.route.Link, {
          class: "button pseudo small",
          href: "/clusters/create",
          id: "addClusterLink",
          style: "display: none;"}, "Add Cluster"),
        m(m.route.Link, {
          class: "button pseudo small",
          href: "/servers/create",
          id: "addServerLink",
          style: "display: none;"}, "Add Server"),
        m("button", {
          class: "psuedo small",
          id: "tokenButton",
          style: "display: none;",
          onclick: function() {
            prompt("press ctrl+c to copy the jwt below", token);
          }}, "Token"),
        m("button", {
          class: "small",
          id: "logoutButton",
          style: "display: none;",
          onclick: function() {
            auth0.logout();
            token = null;
          }}, "Logout"),
        m("button", {
          class: "small",
          id: "loginButton",
          onclick: async function() {
            await auth0.loginWithRedirect();
          }}, "Login")
      ])
    ]
    return elements;
  },
  refresh: function() {
    if (token) {
      document.getElementById("loginButton").style.display="none";
      document.getElementById("logoutButton").style.display="block";
      document.getElementById("tokenButton").style.display="block";
      document.getElementById("dashboardLink").style.display="block";
      if (hasPermission('post:clusters')) {
        document.getElementById("addClusterLink").style.display="block";
      }
      if (hasPermission('post:servers')) {
        document.getElementById("addServerLink").style.display="block";
      }
    } else {
      document.getElementById("loginButton").style.display="block";
      document.getElementById("logoutButton").style.display="none";
      document.getElementById("tokenButton").style.display="none";
      document.getElementById("dashboardLink").style.display="none";
      document.getElementById("addServerLink").style.display="none";
      document.getElementById("addClusterLink").style.display="none";
    }
  }
}

export {NavBar};
