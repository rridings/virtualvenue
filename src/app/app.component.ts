import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { CompetitionsService } from 'app/services/competitions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  competitionName$ : Observable<string>;
  
  constructor(public competitionsService: CompetitionsService, public auth: AuthService) {
    auth.handleAuthentication();
    auth.scheduleRenewal();
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewTokens();
    }
    
    this.competitionName$ = this.competitionsService.name$;
  }
}