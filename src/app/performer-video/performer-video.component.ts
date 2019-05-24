import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { VideosService } from 'app/services/videos.service';
import { Video } from 'app/model/video';

@Component({
  selector: 'performer-video',
  templateUrl: './performer-video.component.html',
  styleUrls: ['./performer-video.component.css']
})
export class PerformerVideoComponent implements OnInit {

  currentVideoUrl$ : Observable<string>;

  constructor(public videosService: VideosService, public auth: AuthService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.currentVideoUrl$ = this.videosService.currentVideoUrl$;
  }
}
