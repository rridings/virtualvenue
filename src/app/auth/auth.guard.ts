import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService:AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        localStorage.setItem('route', state.url);
        console.log("here");
        if (localStorage.getItem('isLoggedIn')) {
            // logged in so return true
            console.log("logged in");
            return true;
        }
        console.log("not logged in");

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
