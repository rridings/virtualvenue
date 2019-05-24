import { PerformersPage } from 'app/states/performers-page';
import { StoreService } from 'app/core/services/store.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PerformersPageStore extends StoreService<PerformersPage> {
    protected store: string = 'performers-page';

    constructor() {
        super({
            loading: true,
            performers: [],
            formStatus: '',
            totalPerformers: 0,
            currentPerformer: '',
        })
    }
}