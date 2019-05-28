import { VideosPageStore } from './videos-page.store';
import { VideosFirestore } from './videos.firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Video } from '../model/video';


@Injectable({
  providedIn: 'root'
})
export class VideosService {
  
  private performer_id : string;
  
  constructor(
    private firestore: VideosFirestore,
    private store: VideosPageStore
  ) {}
  
  init(performer_id : string) {
    this.firestore.collection$(ref => ref.where('performer_id', '==', performer_id)).pipe(
      tap(videos => {
        this.store.patch({
          loading: false,
          videos,
          currentVideoUrl: '',
        }, `videos collection subscription`)
      })
    ).subscribe();
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
  
  get currentVideoUrl$() : Observable<string> { 
    return this.store.state$.pipe(map(state => state.currentVideoUrl))
  }
  
  set currentVideoUrl(url : string) {
    this.store.patch({ currentVideoUrl : url }, "set current video url");
  }
      
  create(video: Video) {
    this.store.patch({ loading: true, videos: [], formStatus: 'Saving...' }, "video create")
    return this.firestore.add(video).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "video create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "video create timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "video create ERROR")
    })
  }

  delete(id: string): any {
    this.store.patch({ loading: true, videos: [] }, "video delete")
    return this.firestore.delete(id).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "video delete ERROR")
    })
  }
}