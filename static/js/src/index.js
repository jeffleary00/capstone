import {auth0, token, initClient, decodeToken} from "./auth";
import {NavBar} from './views/components/NavBar';
import {WelcomePage} from './views/pages/WelcomePage';
import {LandingPage} from './views/pages/LandingPage';

const m = require("mithril");
const root = document.getElementById("myapp");
const nav = document.getElementById("mynav");

let refreshTokenState = async function() {
  if (!token) {
    try {
      await auth0.handleRedirectCallback();
      var t = await auth0.getTokenSilently();
      decodeToken(t);
      NavBar.refresh();
    } catch (err) {
      // do nothing
    }
  }
}

window.addEventListener('load', async () => {
  await initClient();
  refreshTokenState();
});
window.setInterval(refreshTokenState, 1000);

m.mount(nav, NavBar);
m.route(root, "/", {
  "/": WelcomePage,
  "/login-results": LandingPage
})
