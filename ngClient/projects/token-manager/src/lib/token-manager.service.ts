import { Injectable } from '@angular/core';
import Cookie from './classes/Cookie';
import SessionStorage from './classes/SessionStorage';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {
  role: string;
  constructor() { }

  setTokenWithExpiration(token: string, expiration: Number) {
    Cookie.
  }
}
