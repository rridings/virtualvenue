import { Performer } from 'app/model/performer';
export interface PerformersPage {

   loading: boolean;
   performers: Performer[];
   formStatus: string;
   currentPerformer: Performer;
   totalPerformers: number;
}