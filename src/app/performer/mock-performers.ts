import { Performer } from './performer';
import { Video } from './video';

export const PERFORMERS: Performer[] = [
  { id: 11, name: 'HomeFree', votes: 2 },
  { id: 12, name: 'Sofi Tukker', votes: 4 },
  { id: 13, name: 'Trees On Fire', votes: 12 }
];

export const VIDEOS: Video[] = [
  { id: 1, performer_id : 11, title : 'Ring of Fire', url : 'https://www.youtube.com/embed/0l3dsHCScxU', image_url : 'https://i1.ytimg.com/vi/0l3dsHCScxU/mqdefault.jpg'},
  { id: 2, performer_id : 11, title : 'Man of Constant Sorrows', url : 'https://www.youtube.com/embed/-ew_bfFvros', image_url : 'https://i1.ytimg.com/vi/-ew_bfFvros/mqdefault.jpg'},
  { id: 3, performer_id : 12, title : 'Awoo LIVE', url : 'https://www.youtube.com/embed/j52qpfr28Fw', image_url : 'https://i1.ytimg.com/vi/j52qpfr28Fw/mqdefault.jpg'},
  { id: 4, performer_id : 12, title : 'Best Friend', url : 'https://www.youtube.com/embed/rZb1bEW3eZI', image_url : 'https://i1.ytimg.com/vi/rZb1bEW3eZI/mqdefault.jpg'},
  { id: 5, performer_id : 13, title : 'Falling Down', url : 'https://www.youtube.com/embed/vGcE2sPI4Cc', image_url : 'https://i1.ytimg.com/vi/vGcE2sPI4Cc/mqdefault.jpg'},
  { id: 6, performer_id : 13, title : 'Spinning', url : 'https://www.youtube.com/embed/Xi2W1buK1-A', image_url : 'https://i1.ytimg.com/vi/Xi2W1buK1-A/mqdefault.jpg'}
];
