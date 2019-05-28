import { Injectable } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore.service';
import { User } from 'app/model/user';

@Injectable({
    providedIn: 'root'
})
export class UserFirestore extends FirestoreService<User> {

    protected basePath: string = 'users';

}