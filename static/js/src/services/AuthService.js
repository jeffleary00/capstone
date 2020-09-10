const JWTS_LOCAL_KEY = 'CAPSTONE_MONITOR_LOCAL_KEY';
const JWTS_ACTIVE_INDEX_KEY = 'CAPSTONE_MONITOR_ACTIVE_INDEX_KEY';

class AuthService {
  constructor() {
    this.token = null;
    this.payload = null;
  }

  isAuthenticated() {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  hasPermission(p) {
    return this.payload && this.payload.permissions && this.payload.permissions.length && this.payload.permissions.indexOf(p) >= 0;
  }

  loadJwts() {
    this.token = localStorage.getItem(JWTS_LOCAL_KEY) || null;
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  setJwt() {
    localStorage.setItem(JWTS_LOCAL_KEY, this.token);
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  activeJWT() {
    return this.token;
  }

  checkTokenFragment() {
    const fragment = window.location.hash.substr(1).split('&')[0].split('=');
    if ( fragment[0] === 'access_token' ) {
      this.token = fragment[1];
      this.setJwt();
    }
  }

  decodeJWT(token) {
    /* const jwtservice = new JwtHelperService();
    this.payload = jwtservice.decodeToken(token);
    return this.payload; */
    var base64Url = token.split('.')[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map((c)=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    this.payload = JSON.parse(base64);
    return this.payload;
  }

  logout() {
    this.token = '';
    this.payload = null;
    this.setJwt();
  }
}

module.exports = AuthService;
