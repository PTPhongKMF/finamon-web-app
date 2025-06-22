import ky from "ky";
import Cookies from "js-cookie";

const KyAspDotnet_LOCAL = "http://localhost:5296/";
const KyAspDotnet_WEB = "https://finamon.runasp.net/";

const KyDjango_LOCAL = "http://localhost:8000/";
const KyDjango_WEB = "";

export const kyAspDotnet = ky.extend({
  prefixUrl: KyAspDotnet_LOCAL, 
  hooks: {
    beforeRequest: [
      request => {
        const token = Cookies.get("token");
        
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    ]
  }
});

export const kyDjango = ky.extend({
  prefixUrl: KyDjango_LOCAL, 
  hooks: {
    beforeRequest: [
      request => {
        const token = Cookies.get("token");
        
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
    ]
  }
});