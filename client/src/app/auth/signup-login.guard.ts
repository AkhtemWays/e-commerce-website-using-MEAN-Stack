import { CommonService } from './../common.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginSignupGuard implements CanActivate {
  constructor(private userService: CommonService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.userService.isLoggedIn();
    if (this.userService.isAuthorized) {
      this.router.navigateByUrl('/home');

      return false;
    }
    return true;
  }
}
