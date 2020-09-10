const m = require("mithril")
var Cluster = require("../../models/Cluster.js")

module.exports = {
    oninit: function(vnode) {
      if (vnode.attrs.id) {
        Cluster.load(vnode.attrs.id)
      } else {
        Cluster.current = {"name": "my cluster"}
      }
    },
    view: function() {
        return m("form", { name: "cluster-form",
                           onsubmit: function(event) {
                            event.preventDefault();
                            Cluster.save();
                            m.route.set("/");
                          }
          }, m("fieldset", [
              m("div", {class: "flex"}, [
                m("label", "Name"),
                m("input[type=text][placeholder=Name]", {
                  id: "name",
                  oninput: function(e) {
                    Cluster.current.name = e.target.value;
                  },
                  value: Cluster.current.name
                })
              ]),
              m("div", {class: "flex"}, [
                m("label", "Notes"),
                m("textarea[rows=6]", {
                  id: "notes",
                  oninput: function(e) {
                    Cluster.current.notes = e.target.value;
                  },
                  value: Cluster.current.notes
                })
              ]),
              m("div", {class: "flex"}, getButtons())
            ])
        )
    }
}

const getButtons = function() {
  var myButtons = [
    m("button.button[type=submit]", {class: "small"}, "Save"),
    m("button.button[type=button]", {
      class: "small pseudo",
      onclick: function() {
        m.route.set("/dashboard");
      }}, "Cancel")
  ]
  if (Cluster.current.id !== undefined) {
      myButtons.push(
        m("button.button[type=button]", {
          class: "pseudo small",
          onclick: function() {
            if (window.confirm("Are you sure you want to delete this?")) {
              return m.request({
                method: "DELETE",
                url: "https://rem-rest-api.herokuapp.com/api/clusters/" + Cluster.current.id,
                withCredentials: true
              }).then(function(result) {
                  m.route.set("/clusters")
              }
            )
          }
        }
      }, "Delete")
    )
  }
  return myButtons;
}
