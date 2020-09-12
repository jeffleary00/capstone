const m = require("mithril");

const ClusterPage = {
  view: function(cluster) {
    console.log(cluster)
    return m("div", {class: "card"}, [
      m("div", {class: "header " + cluster.health[1]}),
      m("p", "servers: " + cluster.servers.length)
    ]);
  }
}

export {ClusterPage};
