const m = require("mithril");
var Cluster = require("../../models/Cluster");
var ClusterCard = require("../components/ClusterCard");

module.exports = {
  oninit: Cluster.loadList,
  view: function() {
    var children = [];
    if (Object.keys(Cluster.list).length < 1) {
      children.push(m("div", {class: "flex"}, [m("p", "no data")]));
    } else {
      var widgets = [];
      for (const i in Cluster.list) {
        var c = Cluster.list[i];
        widgets.push(m(ClusterCard, {'data': c}));
      }
      children.push(m("div", {class: "flex one two-600"}, widgets));
    }
    // add the new-cluster button
    children.push(
      m("button.button", {
        class: "small button",
        onclick:  function(e) {
          m.route.set("/clusters/create");
        }}, "add cluster")
    );
    return children;
  }
}
