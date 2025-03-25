// TrainerProfile.ts

/**
 * Describes a piece of trainer media (image or video).
 */
export interface TrainerMediaItem {
    /** Unique identifier for this media item. */
    id: string;
  
    /** 
     * The type of media:
     * - singleImage: one image
     * - multipleImages: a post or album with multiple images
     * - singleVideo: one video
     * - multipleVideos: a post or album with multiple videos
     */
    type: 'singleImage' | 'multipleImages' | 'singleVideo' | 'multipleVideos';
  
    /**
     * Thumbnail or preview image for this media item.
     * Could be a local require(...) or a remote URI string.
     */
    thumbnail: any;
  
    /**
     * Optionally, you can store more fields here, 
     * e.g., an array of image URIs if multipleImages,
     * a video URL if singleVideo, etc.
     */
    // mediaUrls?: string[];
  }
  
  /**
   * Describes the overall trainer profile data.
   */
  export interface TrainerProfile {
    /** Unique identifier for the trainer. */
    id: string;
  
    /** The trainer's username (e.g., "janesmith"). */
    username: string;
  
    /** The trainer's full display name (e.g., "Jane Smith"). */
    fullName: string;
  
    /** The trainer's rating (1-5, half-stars possible if you like). */
    rating: number;
  
    /** A short summary or tagline for the trainer. */
    shortDescription: string;
  
    /** 
     * A more detailed biography or description of the trainer.
     * Optional; might be displayed in "About Trainer" section.
     */
    detailedDescription?: string;
  
    /**
     * The trainer's main profile image.
     * Could be a local require(...) or a remote URI string.
     */
    profileImage?: any;
  
    /**
     * An optional array of media items (photos or videos) 
     * for this trainer, to be displayed in a grid or gallery.
     */
    media?: TrainerMediaItem[];
  }
  