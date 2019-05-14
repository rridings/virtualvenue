import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-backstage',
  templateUrl: './backstage.component.html',
  styleUrls: ['./backstage.component.css']
})
export class BackstageComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
