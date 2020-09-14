import {auth0, token, initClient, decodeToken} from "./auth";
import {NavBar} from './views/components/NavBar';
import {LandingPage} from './views/pages/LandingPage';
import {DashPage} from './views/pages/DashPage';

const m = require("mithril");
const root = document.getElementById("myapp");
const nav = document.getElementById("mynav");

window.addEventListener('load', async () => {
  await initClient();
  try {
    await auth0.handleRedirectCallback();
    console.log("redirect callback complete");
    var t = await auth0.getTokenSilently();
    decodeToken(t);
    NavBar.refresh();
  } catch (err) {
    console.log(err);
  }
});

m.mount(nav, NavBar);
m.route(root, "/", {
  "/": LandingPage,
  "/dashboard": DashPage
})
