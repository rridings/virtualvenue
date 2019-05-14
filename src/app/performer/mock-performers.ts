import { Performer } from './performer';
import { Video } from './video';

export const PERFORMERS: Performer[] = [
  { id: 11, name: 'HomeFree', votes: 2 },
  { id: 12, name: 'Cold Play', votes: 4 },
  { id: 13, name: 'U2', votes: 12 }
];

export const VIDEOS: Video[] = [
  { id: 1, performer_id : 11, title : 'Ring of Fire', url : 'https://www.youtube.com/embed/0l3dsHCScxU', image_url : '//i1.ytimg.com/vi/0l3dsHCScxU/mqdefault.jpg'},
  { id: 2, performer_id : 11, title : 'Man of Constant Sorrows', url : 'https://www.youtube.com/embed/-ew_bfFvros', image_url : '//i1.ytimg.com/vi/-ew_bfFvros/mqdefault.jpg'}
];
