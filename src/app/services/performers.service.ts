import { PerformersPageStore } from './performers-page.store';
import { PerformersFirestore } from './performers.firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Performer } from '../model/performer';


@Injectable({
  providedIn: 'root'
})
export class PerformersService {

  constructor(
    private firestore: PerformersFirestore,
    private store: PerformersPageStore
  ) {
    this.firestore.collection$().pipe(
      tap(performers => {
        this.store.patch({
          loading: false,
          performers,
          totalPerformers: performers.length,
          currentPerformer : ''
        }, `performers collection subscription`)
      })
    ).subscribe()
  }

  get performers$(): Observable<Performer[]> {
    return this.store.state$.pipe(map(state => state.loading ? [] : state.performers))
  }

  get loading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.loading))
  }

  get noResults$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(state => {
        return !state.loading && state.performers && state.performers.length === 0
      })
    )
  }

  get formStatus$(): Observable<string> {
    return this.store.state$.pipe(map(state => state.formStatus))
  }

  get totalPerformers$(): Observable<number> {
    return this.store.state$.pipe(map(state => state.totalPerformers))
  }

  get currentPerformer$() : Observable<string> { 
    return this.store.state$.pipe(map(state => state.currentPerformer))
  }
  
  set currentPerformer(performerId : string) {
    this.store.patch({ currentPerformer : performerId }, "set current performer");
  }
  
  create(performer: Performer) {
    this.store.patch({ loading: true, performers: [], formStatus: 'Saving...' }, "performer create")
    return this.firestore.create(performer).then(_ => {
      this.store.patch({ formStatus: 'Saved!' }, "employee create SUCCESS")
      setTimeout(() => this.store.patch({ formStatus: '' }, "performer create timeout reset formStatus"), 2000)
    }).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "performer create ERROR")
    })
  }

  delete(id: string): any {
    this.store.patch({ loading: true, performers: [] }, "performer delete")
    return this.firestore.delete(id).catch(err => {
      this.store.patch({ loading: false, formStatus: 'An error ocurred' }, "performer delete ERROR")
    })
  }
}