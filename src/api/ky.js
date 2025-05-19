import originalKy from 'ky';
import Cookies from 'js-cookie';

export const ky = originalKy.extend({
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
