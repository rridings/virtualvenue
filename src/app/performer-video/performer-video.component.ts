import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, flatMap, take, takeUntil } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { VideosService } from 'app/services/videos.service';
import { CompetitionsService } from 'app/services/competitions.service';
import { Video } from 'app/model/video';
import { Role } from 'app/model/role';
import { User } from 'app/model/user';
import { Vote } from 'app/model/vote';


@Component({
  selector: 'performer-video',
  templateUrl: './performer-video.component.html',
  styleUrls: ['./performer-video.component.css']
})
export class PerformerVideoComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  currentVideo$ : Observable<Video>;
  
  currentRound$ : Observable<number>;
  
  canVote : boolean;
  
  vote : number;
            
  entries = [];
  
  constructor(public competitionService: CompetitionsService, public videosService: VideosService, public authService: AuthService, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.currentVideo$ = this.videosService.currentVideo$;
    
    this.currentRound$ = this.competitionService.currentRound$;
    
    this.currentRound$.pipe(takeUntil(this.destroy$)).subscribe( round => {
      if ( round ) {
        this.currentVideo$.pipe(takeUntil(this.destroy$)).subscribe( video => {
          if ( video ) {
            this.canVote = video.round == round;
          }
        });
      }
    });
      
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
    this.videosService.currentVideo$.pipe(takeUntil(this.destroy$)).subscribe( video => {
      if ( video != null ) {
        var role = this.authService.user.role;
        this.videosService.getVote(video.id, role.id).pipe(take(1)).subscribe( vote => {
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
  
    this.currentVideo$.pipe(takeUntil(this.destroy$)).subscribe( video => {
      if ( video != null ) {
        this.videosService.getVote(video.id, role.id).pipe(take(1)).subscribe( vote => {
          if ( vote ) {
            vote.vote = this.vote;
          }
          else {
            var vote = new Vote();
            vote.role_id = role.id;
            vote.video_id = video.id;
            vote.vote = this.vote;
          }
        
          this.videosService.castVote(vote);
        });
      }
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
