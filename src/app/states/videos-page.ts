import { Video } from 'app/model/video';
export interface VideosPage {

   loading: boolean;
   videos: Video[];
   currentVideoUrl : string;
   formStatus: string;
}