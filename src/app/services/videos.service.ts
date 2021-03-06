import { VideosPageStore } from './videos-page.store';
import { VideosFirestore } from './videos.firestore';
import { VoteFirestore } from './vote.firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, Subject } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';
import { Video } from '../model/video';
import { Vote } from '../model/vote';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  private performer_id : string;
  
  private _currentVideo = new BehaviorSubject(null);
  
  showUploadVideo$ = new BehaviorSubject<boolean>(false);

  constructor(
    private videoFirestore: VideosFirestore,
    private voteFirestore: VoteFirestore,
    private store: VideosPageStore
  ) {}
  
  init(performer_id : string) {
    this.videoFirestore.collection$(ref => ref.where('performer_id', '==', performer_id).orderBy('round')).pipe(
      tap(videos => {
        this.store.patch({
          loading: false,
          videos
        }, `videos collection subscription`)
      })
    ).pipe(takeUntil(this.destroy$)).subscribe();
    this.performer_id = performer_id;
  }

  get videos$(): Observable<Video[]> {
    return this.store.state$.pipe(map(state => state.loading ? [] : state.videos));
  }
  
  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading));
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus));
  }
  
  get currentVideo$() : Observable<Video> { 
    return this.store.state$.pipe(map(state => state.currentVideo))
  }
  
  set currentVideo(video : Video) {
    this.store.patch({ currentVideo : video }, "set current video");
  }
        
  create(video: Video) {
    this.store.patch({ loading: true, videos: [], formStatus: 'Saving...' }, "video create")
    return this.videoFirestore.add(video).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "video create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "video create timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "video create ERROR")
    })
  }

  delete(id: string): any {
    this.store.patch({ loading: true, videos: [] }, "video delete")
    return this.videoFirestore.delete(id).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "video delete ERROR")
    })
  }
  
  castVote(vote: Vote) {
    if ( vote.id != null ) {
      this.voteFirestore.update(vote.id, vote);
    }
    else {
      this.voteFirestore.add(vote);
    }
  }
      
  getVote(video_id : string, role_id : string) : Observable<Vote> {
    return this.voteFirestore.collection$(ref => ref.where('video_id', '==', video_id).where('role_id', '==', role_id).limit(1)).pipe(map( votes => { return votes[0] } ));
  }  
  
    
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  } 
}