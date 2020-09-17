const m = require("mithril");
import {hasPermission} from "../../auth";

const ClusterCard = {
  view: function(vnode) {
    var c = vnode.attrs.data;
    var health = (c.health === undefined) ? "ok" : c.health[1];
    var count = (c.servers === undefined) ? 0 : c.servers.length;

    // build the buttons available in menu
    var myButtons = [
      m("span", {
        class: "button pseudo stack",
        onclick: function() {
          m.route.set('/servers', {cluster: c.id});
        }}, "servers")
    ];

    // #TODO: add auth based buttons here
    if (hasPermission('patch:clusters')) {
      myButtons.push(
        m("span", {
          class: "button pseudo stack",
          onclick: function() {
            prompt("Notes for '" + c.name + "'", c.notes);
          }}, "notes"),
      )
    }
    if (hasPermission('post:clusters') || hasPermission('patch:clusters')) {
      myButtons.push(
        m("span", {
          class: "button pseudo stack",
          onclick: function() {
            m.route.set('/clusters/:clusterid', {clusterid: c.id});
          }
        }, "edit"),
      )
    }
    return m("div", {class: "card"}, [
      m("span", {
        style: "float: right;",
        class: "button pseudo small",
        onclick: function(e) {
          toggleDisplayState("menu-" + c.id);
        }}, "[menu]"),
      m("div", [
        m("span", {class: "jewel " + health}, ""),
        m("span", c.name)]),
      m("div", {
        id: "menu-" + c.id,
        style: "float: right; display: none; border: solid 1px #ccc;"
      }, myButtons)
    ]);
  }
}

function toggleDisplayState(elementId) {
  /*
  toggle the style display of an element
  args: id of the element
  */
  var target = document.getElementById(elementId);

  if (target.style.display == "block") {
    target.style.display = "none";
  } else {
    target.style.display = "block";
  }
}

export {ClusterCard};
