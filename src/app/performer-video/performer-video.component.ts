import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { VideosService } from 'app/services/videos.service';
import { Video } from 'app/model/video';
import { Role } from 'app/model/role';
import { User } from 'app/model/user';
import { Vote } from 'app/model/vote';
import { take } from "rxjs/operators";


@Component({
  selector: 'performer-video',
  templateUrl: './performer-video.component.html',
  styleUrls: ['./performer-video.component.css']
})
export class PerformerVideoComponent implements OnInit {

  currentVideoUrl$ : Observable<string>;
  
  currentVideo : Video;
  
  vote : number;
            
  entries = [];

  constructor(public videosService: VideosService, public authService: AuthService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.currentVideoUrl$ = this.videosService.currentVideoUrl$;
       
    this.entries = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      }
    ];
    
       // select the first one
    this.videosService.currentVideo$.subscribe( video => {
      if ( video != null )
      {
        this.currentVideo = video;
        var role = this.authService.user.role;
        var getVoteSubscription = this.videosService.getVote(video.id, role.id).pipe(take(1)).subscribe( vote => {
          if ( vote ) {
            this.vote = vote.vote;
          }
          else {
            this.vote = 0;
          }
        });
      }
    });
   
  }
  
  getCurrentUser() : User {
    return this.authService.user;
  }
    
  onCastVote(role : Role): void {
    console.log("User - " + role.user +  " Vote - " + this.vote);
  
      var getVoteSubscription = this.videosService.getVote(this.currentVideo.id, role.id).pipe(take(1)).subscribe( vote => {
        if ( vote ) {
          vote.vote = this.vote;
        }
        else {
          var vote = new Vote();
          vote.role_id = role.id;
          vote.video_id = this.currentVideo.id;
          vote.vote = this.vote;
        }
        
        this.videosService.castVote(vote);
        getVoteSubscription.unsubscribe();
      });
    
  }
}
