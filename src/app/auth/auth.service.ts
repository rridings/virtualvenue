import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { of as observableOf} from 'rxjs';
import { timer as observableTimer} from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { ENV } from './../core/env.config';

@Injectable()
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  
  userRef = this.db.collection('users');
   
  userProfile: any;
  refreshSubscription: any;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid email profile'
  });

  constructor(public router: Router, public db: AngularFirestore) {
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

  public getProfile(): void {
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
        self.userProfile = profile;
        self.findUserByEmail(profile.email).then(data => {
          if ( data ) {
            self.userProfile.name = data.name;
            self.userProfile.picture = data.picture;
            self.userProfile.last_login = Date.now();
            self.updateUser(self.userProfile);
          }
          else {
            profile.last_login = Date.now();
            self.createUser(profile);
          }
        });
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
    
     
    this.getProfile();
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
    this.userProfile = null;
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
  
  createUser(profile) {
    this.db.collection('users').doc(profile.email).set
    ({'name': profile.name, 'picture': profile.picture});
  }    
  
  updateUser(profile) {
    this.db.collection('users').doc(profile.email).set
    ({'name': profile.name, 'picture': profile.picture, 'last_login':profile.last_login});
  }    
  
  findUserByEmail(email) {
     return this.db.collection("users")
            .doc(email)
            .ref
            .get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    console.log("No such document!");
                }
                
                return doc.data();
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
  }
}
