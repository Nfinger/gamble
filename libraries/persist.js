// @flow
// import { parseCookies } from 'nookies';
// import Cookie from 'js-cookie';
// import { addMonths } from 'date-fns';

export default class persist {
  static get ACCESS_TOKEN_KEY(): string {
    return 'authToken';
  }

  // static async willGetAccessToken(ctx) {
  static async willGetAccessToken() {
    // return parseCookies(ctx, 'authToken');
    return localStorage.getItem('authToken');
  }

  static async willSetAccessToken(value: string) {
    return localStorage.setItem('authToken', value);
  }

  static async willRemoveAccessToken() {
    // return Cookie.remove('authToken');
    return localStorage.removeItem('authToken');
  }
}
