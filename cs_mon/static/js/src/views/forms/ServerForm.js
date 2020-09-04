var m = require("mithril")
var Server = require("./Server.js")

module.exports = {
    oninit: function(vnode) {
      if (vnode.attrs.id) {
        Server.load(vnode.attrs.id)
      } else {
        Server.current = {"name": "my server"}
      }
    },
    view: function() {

        return m("form", { name: "server-form",
                           onsubmit: function(event) {
                            event.preventDefault();
                            Server.save;
                            m.route.set("/servers");
                          }
          }, m("fieldset", [
              m(".flex.two", [
                m("label.label", [
                  m("input.input[type=text][placeholder=Name]", {
                    oninput: function(e) {
                      Server.current.name = e.target.value;
                    },
                    value: Server.current.name;
                  })
                ]),
              m(".flex.two", [
                m("label.label", "Notes"),
                m("input.input[type=text][placeholder=Notes]", {
                  oninput: m.withAttr("value",
                    function(value) {
                      Server.current.notes = value
                    }),
                  value: Server.current.notes})
                ]),
              m(".row", [
                m("label.label", "Is Active"),
                m("input.input[type=checkbox][placeholder=IsActive]", {
                  oninput: m.withAttr("value",
                    function(value) {
                      Server.current.is_active = value
                    }),
                  value: Server.current.is_active})
                ]),
              m(".row", [
                m("button.button[type=submit]", "Save"),
                m("button.button[type=button]", {
                  onclick: function() {
                    if (window.confirm("Are you sure you want to delete this?")) {
                      return m.request({
                        method: "DELETE",
                        url: "https://rem-rest-api.herokuapp.com/api/servers/" + Server.current.id,
                        withCredentials: true
                      }).then(function(result) {
                          m.route.set("/servers")
                        }
                      )
                    }
                  }
                }, "Delete")
              ])
            ])
        )
    }
}
