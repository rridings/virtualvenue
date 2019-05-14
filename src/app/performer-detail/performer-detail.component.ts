import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { PerformerService } from './../performer/performer.service';
import { Performer } from '../performer/performer';
import { Video } from '../performer/video';

@Component({
  selector: 'performer-detail',
  templateUrl: './performer-detail.component.html',
  styleUrls: ['./performer-detail.component.css']
})
export class PerformerDetailComponent implements OnInit {

  performerId: Number;

  videos: Video[];

  constructor(public performerService: PerformerService, public auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.performerService.getCurrentPerformer().subscribe(performer => {
      this.videos = this.performerService.getPerformerVideos(performer);
    });
  }

  onSelect(video: Video): void {
    this.performerService.setCurrentVideo(video);
  }
}
