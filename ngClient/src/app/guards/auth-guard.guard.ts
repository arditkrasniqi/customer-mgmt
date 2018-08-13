import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenManagerService } from '../../../projects/token-manager/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return TokenManagerService.compareTokens();
  }
}
