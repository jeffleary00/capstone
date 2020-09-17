const m = require("mithril");
import {Cluster} from "../../models/Cluster";
import {Server} from "../../models/Server";
import {ServerCard} from "../components/ServerCard";

const ServerPage = {
  oninit: function(vnode) {
    console.log("server vnode");
    console.log(vnode);
    if (vnode.attrs.id) {
      Cluster.loadList();
      Server.list = Cluster.list;
    } else {
      Server.loadList();
    }
  },
  view: function(cluster) {
    var children = [];
    if (Object.keys(Server.list).length < 1) {
      children.push(m("div", {class: "flex"}, [m("p", "no data")]));
    } else {
      var widgets = [];
      for (const i in Server.list) {
        var c = Server.list[i];
        widgets.push(m(ServerCard, {'data': c}));
      }
      children.push(m("div", {class: "flex one two-600"}, widgets));
    }
    return children;
  }
}

export {ServerPage};
