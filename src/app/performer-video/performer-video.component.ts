import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { PerformerService } from './../performer/performer.service';
import { Performer } from '../performer/performer';
import { Video } from '../performer/video';

@Component({
  selector: 'performer-video',
  templateUrl: './performer-video.component.html',
  styleUrls: ['./performer-video.component.css']
})
export class PerformerVideoComponent implements OnInit {

  private url: BehaviorSubject<String> = new BehaviorSubject(null);

  constructor(public performerService: PerformerService, public auth: AuthService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.performerService.getCurrentVideo().subscribe(video => {
      this.url.next(video.url);
    });
  }
}
