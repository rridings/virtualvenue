import { Injectable } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore.service';
import { Vote } from 'app/model/vote';

@Injectable({
    providedIn: 'root'
})
export class VoteFirestore extends FirestoreService<Vote> {

    protected basePath: string = 'cville-votes';

}