import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { map, flatMap, takeUntil } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { VideosService } from 'app/services/videos.service';
import { PerformersService } from 'app/services/performers.service';
import { Performer } from 'app/model/performer';
import { Video } from 'app/model/video';

@Component({
  selector: 'performer-video-list',
  templateUrl: './performer-video-list.component.html',
  styleUrls: ['./performer-video-list.component.css',
              '../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class PerformerVideoListComponent implements OnInit {
  loading$: Observable<boolean>;
  videos$: Observable<Video[]>;

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(public authService: AuthService, private videosService: VideosService, private performersService: PerformersService) { }

  ngOnInit() {
    this.loading$ = this.videosService.loading$;
    this.videos$ = this.videosService.videos$;
    this.performersService.currentPerformer$.pipe(takeUntil(this.destroy$)).pipe(map((performer) => { 
      console.log("Init VideosService with performer - " + performer.name);
      this.videosService.init(performer.id);
    }));
  }

  onSelect(video: Video): void {
    console.log("Selected video - " + video.url);
    this.videosService.currentVideo = video;
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
