import { UserFirestore } from './user.firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: UserFirestore
  ) {}
  
  createUser(user: User) {
    return this.firestore.add(user);
  }

  updateUser(user: User) {
    this.firestore.update(user.id, user); 
  }
  
  deleteUser(id: string): any {
    return this.firestore.delete(id);
  }
  
  getUser(id: string) {
    return this.firestore.doc$(id);
  }
    
  findRole(user_id) {
//    return this.firestore.collection$("cville-roles", ref => ref.where('user', '==', user_id))
//      .ref
//      .get().then(function(querySnapshot) {
//        var data = querySnapshot.docs.map(function (documentSnapshot) {
//          return documentSnapshot.data();
//        });
//      });
  }
}