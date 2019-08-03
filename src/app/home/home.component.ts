import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import { PerformersService } from 'app/services/performers.service';
import { CompetitionsService } from 'app/services/competitions.service';
import { VideosService } from 'app/services/videos.service';
import { Performer } from 'app/model/performer';
import { Video } from 'app/model/video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
              '../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;
  performers$: Observable<Performer[]>;
  noResults$: Observable<boolean>; 
  currentPerformer$: Observable<Performer>;
  rounds$: Observable<number>;
  currentRound$: Observable<number>;
  videos$: Observable<Video[]>;

  
  constructor(public authService: AuthService, private performers: PerformersService, private videosService: VideosService, private competitonsService: CompetitionsService) { }

  ngOnInit() {
    this.loading$ = this.performers.loading$;
    this.noResults$ = this.performers.noResults$;
    this.performers$ = this.performers.performers$;
    this.currentPerformer$ = this.performers.currentPerformer$;
    this.rounds$ = this.competitonsService.rounds$;
    this.currentRound$ = this.competitonsService.currentRound$;
    this.videos$ = this.videosService.videos$;
  }

  onSelectPerformer(performer: Performer): void {
    this.videosService.init(performer.id);
    this.performers.currentPerformer = performer;
    this.videosService.currentVideo = null;
  }

  onSelectVideo(video: Video): void {
    console.log("Selected video - " + video.url);
    this.videosService.currentVideo = video;
  }
}
