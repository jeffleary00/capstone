const m = require("mithril");
import {hasPermission} from "../../auth";

const ServerCard = {
  view: function(vnode) {
    var c = vnode.attrs.data;
    var health = (c.health === undefined) ? "ok" : c.health[1];

    // build the buttons available in menu
    var myButtons = [
      m("span", {
        class: "button pseudo stack",
        onclick: function() {
          prompt("Notes for '" + c.name + "'", c.notes);
        }}, "notes")
    ];

    if (hasPermission('post:servers') || hasPermission('patch:servers')) {
      myButtons.push(
        m("span", {
          class: "button pseudo stack",
          onclick: function() {
            m.route.set('/servers/:serverid', {serverid: c.id});
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
        }}, m("i", {class: "fas fa-bars", style: "padding-right: .25em;"}, "")),
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

export {ServerCard};