import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService:AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        localStorage.setItem('route', state.url);
        if (localStorage.getItem('isLoggedIn')) {
            // logged in so return true
            console.log("logged in");
            return true;
        }
        console.log("not logged in");

        // not logged in so redirect to login page with the return url
        
        console.log("Return URL: " + state.url);
        this.router.navigate(['/' + state.url], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
