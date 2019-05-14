import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Performer } from './performer';
import { Video } from './video';
import { PERFORMERS } from './mock-performers';
import { VIDEOS } from './mock-performers';

@Injectable({
  providedIn: 'root'
})
export class PerformerService {

  currentPerformer = null;

  private data: BehaviorSubject<Video> = new BehaviorSubject(null);

  constructor() { }

  getPerformers(): Performer[] {
    return PERFORMERS;
  }

  getCurrentPerformer() : Performer {
    return this.currentPerformer;
  }

  getCurrentVideo() : Observable<Video> {
    return this.data;
  }

  setCurrentVideo(video: Video): void {
    this.data.next(video);
  }

  setCurrentPerformer(performer : Performer) {
    this.currentPerformer = performer;
    var videos = this.getPerformerVideos(performer);
    this.setCurrentVideo(videos[0]);
  }

  getPerformerVideos(performer : Performer): Video[] {
    var videos = [];
    for (var i in VIDEOS) {
      if ( performer.id == VIDEOS[i].performer_id ) {
        videos.push(VIDEOS[i]);
      }
    }

    return videos;
  }
}
