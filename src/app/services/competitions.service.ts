import { CompetitionsPageStore } from './competitions-page.store';
import { CompetitionsFirestore } from './competitions.firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, Subject } from 'rxjs';
import { tap, map, takeUntil } from 'rxjs/operators';
import { Competition } from '../model/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
   
  destroy$: Subject<boolean> = new Subject<boolean>();
    
  constructor(
    private firestore: CompetitionsFirestore,
    private store: CompetitionsPageStore
  ) {
    this.firestore.doc$("cville").pipe(
      tap(data => {
        this.store.patch({
          loading: false,
          name : data.name,
          currentRound : data.current_round,
          rounds : data.rounds,
        }, `competition subscription`)
      })
    ).pipe(takeUntil(this.destroy$)).subscribe()
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading));
  }

  get name$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.name));
  }

  get currentRound$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.currentRound));
  }
  
  get rounds$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.rounds));
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}