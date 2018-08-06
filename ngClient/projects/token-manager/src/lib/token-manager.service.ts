import {Injectable} from '@angular/core';
import Cookie from './classes/Cookie';
import SessionStorage from './classes/SessionStorage';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {
  constructor() {
  }

  public static setTokenWithExpiration(token: string, expiration: Number) {
    Cookie.set('token', token);
    Cookie.set('expiration', expiration);
    SessionStorage.set('token', token);
    SessionStorage.set('expiration', expiration);
  }

  private static destroy() {
    Cookie.destroy(['token', 'expiration']);
    SessionStorage.destroy(['token', 'expiration']);
  }

  public static compareTokens() {
    const tokenState = Cookie.get('token') === SessionStorage.get('token');
    if (!tokenState) {
      this.destroy();
      return false;
    }
    return true;
  }
}
