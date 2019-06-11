import { Video } from 'app/model/video';
export interface VideosPage {

   loading: boolean;
   videos: Video[];
   currentVideo : Video;
   formStatus: string;
}