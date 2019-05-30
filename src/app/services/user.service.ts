import { UserFirestore } from './user.firestore';
import { RolesFirestore } from './roles.firestore';
import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../model/user';
import { Role } from '../model/role';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userFirestore: UserFirestore,
    private rolesFirestore: RolesFirestore
  ) {}
  
  createUser(user: User) {
    return this.userFirestore.add(user);
  }

  updateUser(user: User) {
    this.userFirestore.update(user.id, user); 
  }
  
  deleteUser(id: string): any {
    return this.userFirestore.delete(id);
  }
  
  getUser(email: string) : Observable<User> {
    return this.userFirestore.collection$(ref => ref.where('email', '==', email).limit(1)).pipe(map( users => { return users[0] } ));
  }
   
  createRole(role: Role) {
    return this.rolesFirestore.add(role);
  }
    
  getRole(user_id) : Observable<Role> {
    return this.rolesFirestore.collection$(ref => ref.where('user', '==', user_id).limit(1)).pipe(map( roles => { return roles[0] } ));
  }
}