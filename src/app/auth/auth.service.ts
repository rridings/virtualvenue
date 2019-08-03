import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { Observable, from, BehaviorSubject, of } from 'rxjs';
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
   
  private _user$ : BehaviorSubject<User>; 
  
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

  get user() : User { 
    return this._user$.value;
  } 
  
  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    if ( this.router.url.indexOf('backstage') > 0)
      localStorage.setItem('route', '/backstage/home');
    else
      localStorage.setItem('route', '/home');
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
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

      if (profile) {
        var getUserSubscription = self.userService.getUser(profile.email).pipe(take(1)).subscribe( user => {
          if ( user ) {
            user.last_login = Date.now();
            self.userService.updateUser(user);
            
            var getRoleSubscription = self.userService.getRole(user.id).pipe(take(1)).subscribe( role => {
              if ( role ) {
                user.role = role;
              }
              
              getRoleSubscription.unsubscribe();
              
              self._user$ = new BehaviorSubject<User>(user); 
              this.router.navigate([localStorage.getItem('route')]);
            });
          }
          else {
            var user = new User();
            user.email = profile.email;
            user.picture = profile.picture;
            user.name = profile.name;
            user.last_login = Date.now();

            this.userService.createUser(user).then(function(newUser) {
              if ( newUser ) {
                user.id = newUser.id;
                var role = new Role();
                role.user = user.id;
                if ( localStorage.getItem('route') == '/backstage' ) {
                  role.type = Role.PERFORMER;
                }
                else {
                  role.type = Role.VIEWER;
                }
            
                self.userService.createRole(role).then(function(r) {
                  if ( r ) {
                    user.role = role;
                  }
                  
                  self._user$ = new BehaviorSubject<User>(user); 
                  this.router.navigate([localStorage.getItem('route')]);
              });
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
    if ( localStorage.getItem('route') && localStorage.getItem('route').includes('backstage') ) {
      localStorage.setItem('route', '/backstage/home');
    }
    else {
      this.router.navigate(['/']);
    }
    
    if ( this._user$ )
      this._user$.next(null);
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

    const source = of(expiresAt).mergeMap(
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
