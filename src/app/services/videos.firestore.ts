import { Injectable } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore.service';
import { Video } from 'app/model/video';

@Injectable({
    providedIn: 'root'
})
export class VideosFirestore extends FirestoreService<Video> {

    protected basePath: string = 'videos';

}