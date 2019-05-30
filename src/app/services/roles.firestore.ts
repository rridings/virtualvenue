import { Injectable } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore.service';
import { Role } from 'app/model/role';

@Injectable({
    providedIn: 'root'
})
export class RolesFirestore extends FirestoreService<Role> {

    protected basePath: string = 'cville-roles';

}