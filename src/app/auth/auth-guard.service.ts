
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) {

  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate(): isAuthenticated: ', this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }

}
