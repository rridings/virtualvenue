import { Injectable } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore.service';
import { Performer } from 'app/model/performer';

@Injectable({
    providedIn: 'root'
})
export class PerformersFirestore extends FirestoreService<Performer> {

    protected basePath: string = 'performers';

}