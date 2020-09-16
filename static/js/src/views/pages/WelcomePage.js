const m = require("mithril");
let WelcomePage = {
  view: function() {
    return [
      m("h2", "Welcome"),
      m("p", "Capstone Monitor is a datacenter/server monitoring dashboard application."),
      m("h3", "Roles"),
      m("p", "Authenticated users with the 'Engineer' role may view the health and details of Clusters and Servers. Only users with the 'Manager' role may edit all Cluster and Server information."),
      m("h3", "JWT info"),
      m("p", "After login, you can click on the Token button, to view the contents of your authenticated jwt.")
    ];
  }
}

export {WelcomePage};
