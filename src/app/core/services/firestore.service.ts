import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;

@Injectable()
export abstract class FirestoreService<T> {

  protected abstract basePath: string;

  constructor(
    @Inject(AngularFirestore) protected db: AngularFirestore,
  ) {}

  /// **************
  /// Get a Reference
  /// **************
  public col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.db.collection<T>(ref, queryFn) : ref;
  }

  /// **************
  /// Get Data
  /// **************

  public collection$<T>(queryFn?): Observable<any[]> {
    return this.col(`${this.basePath}`, queryFn).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }
      
  public doc$<T>(id : string): Observable<any> {
    return this.db.doc(`${this.basePath}/${id}`).snapshotChanges().map(a => {
      // return actions.map(a => {

      // });
      const data = a.payload.data();
      const id = a.payload.id;
      return { id, ...data };
    });
  }

  /// **************
  /// Write Data
  /// **************
  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
    
  set<T>(id : string, data: any) {
    const timestamp = this.timestamp;
    return this.db.doc(`${this.basePath}/${id}`).set({
      ...data,
      updated_at: timestamp,
      created_at: timestamp
    });
  }

  update<T>(id : string, data: any) {
    return this.db.doc(`${this.basePath}/${id}`).update({
      ...data,
      updated_at: this.timestamp
    });
  }

  delete<T>(id : string) {
    return this.db.doc(`${this.basePath}/${id}`).delete();
  }

  public add<T>(data) {
    const timestamp = this.timestamp;
    return this.col(`${this.basePath}`).add({
      ...data,
      updated_at: timestamp,
      created_at: timestamp
    });
  }

  geopoint(lat: number, lng: number) {
    return new firebase.firestore.GeoPoint(lat, lng);
  }

  /// If doc exists update, otherwise set
  upsert<T>(id : string, data: any) {
    const doc = this.db.doc(`${this.basePath}/${id}`).snapshotChanges().take(1).toPromise();
    return doc.then(snap => {
      return snap.payload.exists ? this.update(`${this.basePath}/${id}`, data) : this.set(`${this.basePath}/${id}`, data);
    });
  }

  /// **************
  /// Inspect Data
  /// **************
  inspectDoc(id : string): void {
    const tick = new Date().getTime();
    this.db.doc(`${this.basePath}/${id}`).snapshotChanges()
      .take(1)
      .do(d => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Document in ${tock}ms`, d);
      })
      .subscribe();
  }

  inspectCol(): void {
    const tick = new Date().getTime();
    this.col(`${this.basePath}`).snapshotChanges()
      .take(1)
      .do(c => {
        const tock = new Date().getTime() - tick;
        console.log(`Loaded Collection in ${tock}ms`, c);
      })
      .subscribe();
  }
  /// **************
  /// Create and read doc references
  /// **************

  /// returns a documents references mapped to AngularFirestoreDocument
  docWithRefs$<T>(id : string) {
    return this.doc$(`${this.basePath}/${id}`).map(doc => {
      for (const k of Object.keys(doc)) {
        if (doc[k] instanceof firebase.firestore.DocumentReference) {
          doc[k] = this.db.doc(doc[k].path);
        }
      }
      return doc;
    });
  }

}