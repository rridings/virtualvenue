import { Injectable } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore.service';
import { Competition } from 'app/model/competition';

@Injectable({
    providedIn: 'root'
})
export class CompetitionsFirestore extends FirestoreService<Competition> {

    protected basePath: string = 'competitions';
    
}