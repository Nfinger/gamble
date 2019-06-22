// @flow
import { parseCookies, setCookie } from 'nookies';
// import Cookie from 'js-cookie';
import cookie from 'react-cookies';
import { addMonths } from 'date-fns';

export default class persist {
  static get ACCESS_TOKEN_KEY(): string {
    return 'authToken';
  }

  static async willGetAccessToken(ctx) {
    return parseCookies(ctx, 'authToken');
  }

  static async willSetAccessToken(value: string) {
    return setCookie({}, 'authToken', value, {
      expires: addMonths(new Date(), 12)
    });
  }

  static async willRemoveAccessToken() {
    return cookie.remove('authToken');
  }
}
