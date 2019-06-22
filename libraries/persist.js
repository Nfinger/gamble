// @flow
import { parseCookies } from 'nookies';
import Cookie from 'js-cookie';
import { addMonths } from 'date-fns';

export default class persist {
  static get ACCESS_TOKEN_KEY(): string {
    return 'authToken';
  }

  static async willGetAccessToken(ctx) {
    return parseCookies(ctx, 'authToken');
  }

  static async willSetAccessToken(value: string) {
    return Cookie.set('authToken', value, {
      expires: addMonths(new Date(), 12)
    });
  }

  static async willRemoveAccessToken() {
    return Cookie.remove('authToken');
  }
}
