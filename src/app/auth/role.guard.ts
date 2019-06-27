import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { take, first, map, catchError } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { Role } from 'app/model/role';
import { User } from 'app/model/user';

@Injectable()
export class RoleGuard implements CanActivate {
  
    constructor(private authService:AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.user$.map(user => {
        if ( user && user.role && user.role.type == Role.PERFORMER) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }
      }).take(1)
    }   
}
