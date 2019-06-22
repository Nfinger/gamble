// @flow
import { parseCookies, setCookie, destroyCookie } from 'nookies';
// import Cookie from 'js-cookie';

export default class persist {
  static get ACCESS_TOKEN_KEY(): string {
    return 'authToken';
  }

  static async willGetAccessToken(ctx) {
    return parseCookies(ctx, 'authToken');
  }

  static async willSetAccessToken(value: string) {
    return setCookie({}, 'authToken', value, {
      expires: 999999999999999999999999
    });
  }

  static async willRemoveAccessToken() {
    return destroyCookie('authToken');
  }
}
