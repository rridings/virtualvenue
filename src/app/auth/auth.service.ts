import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { of as observableOf} from 'rxjs';
import { timer as observableTimer} from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import { take } from "rxjs/operators";
import * as auth0 from 'auth0-js';
import { ENV } from './../core/env.config';
import { UserService } from 'app/services/user.service';
import { Role } from 'app/model/role';
import { User } from 'app/model/user';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
   
  user: User;
  refreshSubscription: any;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid email profile'
  });

  constructor(public router: Router, public userService : UserService) {
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    if ( this.router.url.indexOf('backstage') > 0)
      localStorage.setItem('route', '/backstage');
    else
      localStorage.setItem('route', '/home');
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.router.navigate([localStorage.getItem('route')]);
      } else if (err) {
        this.router.navigate([localStorage.getItem('route')]);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private localLogin(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;

    this.scheduleRenewal();
    
    if (!this._accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(this._accessToken, (err, profile) => {
      if ( err )
      { 
        console.log("Could not get profile (" + err.error + ":"  +  err.error_description + ")");
        return;
      }

      if (!self.user && profile) {
        var getUserSubscription = self.userService.getUser(profile.email).subscribe( user => {
          if ( user ) {
            self.user = user;
            self.user.last_login = Date.now();
            self.userService.updateUser(self.user);
            
            var getRoleSubscription = self.userService.getRole(self.user.id).pipe(take(1)).subscribe( role => {
              if ( role ) {
                self.user.type = role.type;
              }
              getRoleSubscription.unsubscribe();
            });
            
          }
          else {
            self.user = new User();
            self.user.email = profile.email;
            self.user.picture = profile.picture;
            self.user.name = profile.name;
            self.user.last_login = Date.now();
            self.userService.createUser(self.user).then(function(user) {
              if ( user ) {
                self.user.id = user.id;
                
                var role = new Role();
                role.user = self.user.id;
                if ( localStorage.getItem('route') == '/backstage' ) {
                  role.type = 3
                }
                else {
                  role.type = 1
                }
            
                self.userService.createRole(role);
              }
            });
          }
          
          getUserSubscription.unsubscribe();
        });
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._idToken = '';
    this._accessToken = '';
    this._expiresAt = 0;
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
    this.user = null;
  }

  public renewTokens(): void {
    if ( !this.isAuthenticated() ) {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
         this.localLogin(authResult);
       } else if (err) {
          console.log("Could not get a new token (" + err.error + ":"  +  err.error_description + ")");
          this.logout();
       }
      });
    }
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return Date.now() < this._expiresAt;
  }

  public scheduleRenewal() {
    if(!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = this._expiresAt;

    const source = observableOf(expiresAt).mergeMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return observableTimer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewTokens();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if(!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }
}
