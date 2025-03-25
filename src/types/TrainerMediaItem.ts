import { TrainerMediaItem } from "./TrainerProfile";
// For demonstration, here’s some dummy media data
export const DUMMY_MEDIA: TrainerMediaItem[] = [
    {
      id: 'm1',
      type: 'singleImage',
      thumbnail: require('../assets/images/Image_01.jpeg'),
    },
    {
      id: 'm2',
      type: 'multipleImages',
      thumbnail: require('../assets/images/Image_01.jpeg'),
    },
    {
      id: 'm3',
      type: 'singleVideo',
      thumbnail: require('../assets/images/Image_01.jpeg'),
    },
    {
      id: 'm4',
      type: 'multipleVideos',
      thumbnail: require('../assets/images/Image_01.jpeg'),
    },
    // etc.
  ];
  