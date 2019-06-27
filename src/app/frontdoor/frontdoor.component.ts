import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-frontdoor',
  templateUrl: './frontdoor.component.html',
  styleUrls: ['./frontdoor.component.css']
})
export class FrontdoorComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    localStorage.removeItem('route');
  }

}
