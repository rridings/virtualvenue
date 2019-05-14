import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { Performer } from './performer';
import { Video } from './video';
import { PERFORMERS } from './mock-performers';
import { VIDEOS } from './mock-performers';

@Injectable({
  providedIn: 'root'
})
export class PerformerService {

  private currentPerformer: BehaviorSubject<Performer> = new BehaviorSubject(null);

  private currentVideo: BehaviorSubject<Video> = new BehaviorSubject(null);

  constructor() { }

  getPerformers(): Performer[] {
    return PERFORMERS;
  }

  getCurrentPerformer() : Observable<Performer> {
    return this.currentPerformer;
  }

 setCurrentPerformer(performer : Performer) {
    this.currentPerformer.next(performer);
    var videos = [];
    for (var i in VIDEOS) {
      if ( performer.id == VIDEOS[i].performer_id ) {
        videos.push(VIDEOS[i]);
      }
    }
    this.setCurrentVideo(videos[0]);
  }

  getCurrentVideo() : Observable<Video> {
    return this.currentVideo;
  }

  setCurrentVideo(video: Video): void {
    this.currentVideo.next(video);
  }

  getPerformerVideos(performer : Performer): Video[]{
    var videos = [];
    for (var i in VIDEOS) {
      if ( performer.id == VIDEOS[i].performer_id ) {
        videos.push(VIDEOS[i]);
      }
    }

    return videos;
  }
}
