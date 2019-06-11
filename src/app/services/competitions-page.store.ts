import { CompetitionsPage } from 'app/states/competitions-page';
import { StoreService } from 'app/core/services/store.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CompetitionsPageStore extends StoreService<CompetitionsPage> {
    protected store: string = 'competitions-page';

    constructor() {
        super({
            loading: true,
            name: '',
            currentRound: 0,
            rounds: 0,
        })
    }
}