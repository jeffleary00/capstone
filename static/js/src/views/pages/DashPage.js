const m = require("mithril");
import {Cluster} from "../../models/Cluster";
import {ClusterCard} from "../components/ClusterCard";
import {auth0, token, hasPermission} from "../../auth";

const DashPage = {
  oninit: function() {
    console.log("Cluster:");
    console.log(Cluster);

    Cluster.loadList();
    window.setInterval(Cluster.loadList(), 60000);
  },
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

    return children;
  }
}

export {DashPage};
