import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { VideosService } from 'app/services/videos.service';
import { PerformersService } from 'app/services/performers.service';
import { Performer } from 'app/model/performer';
import { Video } from 'app/model/video';

@Component({
  selector: 'performer-video-list',
  templateUrl: './performer-video-list.component.html',
  styleUrls: ['./performer-video-list.component.css']
})
export class PerformerVideoListComponent implements OnInit {
  loading$: Observable<boolean>;
  videos$: Observable<Video[]>;

  constructor(public auth: AuthService, private videosService: VideosService, private performersService: PerformersService) { }

  ngOnInit() {
    this.loading$ = this.videosService.loading$;
    this.videos$ = this.videosService.videos$;
    this.performersService.currentPerformer$.pipe(map((performer) => { 
      console.log("Init VideosService with performer - " + performer.name);
      this.videosService.init(performer.id);
    }));
  }

  onSelect(video: Video): void {
    this.videosService.currentVideoUrl = video.url;
  }
}
