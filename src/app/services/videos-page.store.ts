import { VideosPage } from 'app/states/videos-page';
import { StoreService } from 'app/core/services/store.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VideosPageStore extends StoreService<VideosPage> {
    protected store: string = 'videos-page';

    constructor() {
        super({
            loading: true,
            videos: [],
            currentVideoUrl: '',
            formStatus: '',
        })
    }
}