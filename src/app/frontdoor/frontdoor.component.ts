import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-frontdoor',
  templateUrl: './frontdoor.component.html',
  styleUrls: ['./frontdoor.component.css',
              '../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class FrontdoorComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    localStorage.removeItem('route');
  }

}
