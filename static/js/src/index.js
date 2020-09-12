import createAuth0Client from '@auth0/auth0-spa-js';

const m = require("mithril")
const root = document.getElementById("myapp");
let auth0 = null;
let user = null;

window.addEventListener('load', async () => {
  auth0 = await createAuth0Client({
    domain: 'dev-us1d520w.us.auth0.com',
    client_id: '1XMqKvqO5JYM8GNh1oEl28voSfef8EKa',
    redirect_uri: 'https://cs-monitor.herokuapp.com'
  });
});
window.addEventListener('load', async () => {
  await auth0.handleRedirectCallback();
});
window.addEventListener('load', async () => {
  user = await auth0.getUser();
  console.log(user);
});

if (auth0 === null) {
  m.render(root, [
    m("div", "welcome unknown guest"),
    m("button.button", {id: "login"}, "login")
  ]);
} else {
  m.render(root, [
    m("div", "welcome registered user")
  ]);
}


document.getElementById('login').addEventListener('click', async () => {
  await auth0.loginWithRedirect();
});
