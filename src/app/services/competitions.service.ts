import { CompetitionsPageStore } from './competitions-page.store';
import { CompetitionsFirestore } from './competitions.firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Competition } from '../model/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
      
  constructor(
    private firestore: CompetitionsFirestore,
    private store: CompetitionsPageStore
  ) {
    this.firestore.doc$("cville").pipe(
      tap(data => {
        this.store.patch({
          loading: false,
          name : data.name,
        }, `competition subscription`)
      })
    ).subscribe()
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading));
  }

  get name$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.name));
  }

}