import { Competition } from 'app/model/competition';
export interface CompetitionsPage {

   loading: boolean;
   name: string;
   currentRound: number;
   rounds: number;
}