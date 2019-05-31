import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { VideosService } from 'app/services/videos.service';
import { Video } from 'app/model/video';
import { Role } from 'app/model/role';
import { User } from 'app/model/user';

@Component({
  selector: 'performer-video',
  templateUrl: './performer-video.component.html',
  styleUrls: ['./performer-video.component.css']
})
export class PerformerVideoComponent implements OnInit {

  currentVideoUrl$ : Observable<string>;

  vote : string;
  
  constructor(public videosService: VideosService, public authService: AuthService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.currentVideoUrl$ = this.videosService.currentVideoUrl$;
  }
  
  getCurrentUser() : User {
    return this.authService.user;
  }
  
  onCastVote(role : Role): void {
    console.log("User - " + role.user +  " Vote - " + this.vote);
  }
}
