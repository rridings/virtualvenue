import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import { CompetitionsService } from 'app/services/competitions.service';
import { VideosService } from 'app/services/videos.service';
import { PerformersService } from 'app/services/performers.service';
import { Role } from 'app/model/role';
import { User } from 'app/model/user';
import { Video } from 'app/model/video';
import { Performer } from 'app/model/performer';

@Component({
  selector: 'app-backstagehome',
  templateUrl: './backstagehome.component.html',
  styleUrls: ['./backstagehome.component.css',
              '../../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class BackstageHomeComponent implements OnInit {
  rounds$: Observable<number>;
  currentRound$: Observable<number>;
  currentPerformer$: Observable<Performer>;
  videos$: Observable<Video[]>;
  
  constructor(public authService: AuthService, private competitonsService: CompetitionsService, private performersService: PerformersService, private videosService: VideosService) { }

  ngOnInit() {
    this.rounds$ = this.competitonsService.rounds$;
    this.currentRound$ = this.competitonsService.currentRound$;
    this.videos$ = this.videosService.videos$;
    
    //unsubscribe
    this.authService.user$.subscribe(user => {
        if ( user && user.role && user.role.type == Role.PERFORMER) {
          this.currentPerformer$ = this.performersService.getPerformer(user.id);
          this.currentPerformer$.subscribe(performer => {
            this.performersService.currentPerformer = performer;
            
            console.log("Init VideosService with performer - " + performer.name);
            this.videosService.init(performer.id);
            
          });
        }
      });
  }
  
  onSelect(video: Video): void {
    console.log("Selected video - " + video.url);
    this.videosService.currentVideo = video;
  }
}