// @flow
import { parseCookies, setCookie } from 'nookies';
// import Cookie from 'js-cookie';
import cookie from 'react-cookies';
import { addMonths } from 'date-fns';

export default class persist {
  static get ACCESS_TOKEN_KEY(): string {
    return 'accessToken';
  }

  static async willGetAccessToken(ctx) {
    return parseCookies(ctx, 'accessToken');
  }

  static async willSetAccessToken(value: string) {
    return setCookie({}, 'accessToken', value, {
      path: '/',
      expires: addMonths(new Date(), 12)
    });
  }

  static async willRemoveAccessToken() {
    return cookie.remove('accessToken');
  }
}
