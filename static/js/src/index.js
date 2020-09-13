import createAuth0Client from '@auth0/auth0-spa-js';

const m = require("mithril")
const root = document.getElementById("myapp");
let auth0 = null;
let user = null;

window.addEventListener('load', async () => {
  console.log("creating auth0 client");
  auth0 = await createAuth0Client({
    domain: 'dev-us1d520w.us.auth0.com',
    client_id: '1XMqKvqO5JYM8GNh1oEl28voSfef8EKa',
    redirect_uri: 'https://cs-monitor.herokuapp.com'
  });
});
window.addEventListener('load', async () => {
  if (auth0) {
    await auth0.handleRedirectCallback();
    user = await auth0.getUser();
    console.log("user data");
    console.log(user);
    console.log(window.location.hash.substr(1).split('&')[0].split('='););
  }
});

m.render(root, [
  m("div", "welcome unknown guest"),
  m("button.button", {id: "login"}, "login")
]);

document.getElementById('login').addEventListener('click', async () => {
  await auth0.loginWithRedirect();
});
