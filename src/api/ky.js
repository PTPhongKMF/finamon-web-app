import ky from 'ky';
import Cookies from 'js-cookie';

const kyAspDotnet_LOCAL = "http://localhost:5296/";
const kyAspDotnet_WEB = "https://finamon.runasp.net/";

export const kyAspDotnet = ky.extend({
  prefixUrl: kyAspDotnet_LOCAL, 
  hooks: {
    beforeRequest: [
      request => {
        const token = Cookies.get("token");
        
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ]
  }
});

export const kyDjango = ky.extend({
  prefixUrl: "", 
  hooks: {
    beforeRequest: [
      request => {
        const token = Cookies.get("token");
        
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ]
  }
});