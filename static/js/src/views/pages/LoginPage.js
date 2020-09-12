const m = require("mithril");
import {auth0, login} from "../../auth";

const LoginPage = {
  view: function() {
    if (auth0.isAuthenticated()) {
      m.route.set("/dash");
    } else {
      login();
    }
  }
}

export {LoginPage};
