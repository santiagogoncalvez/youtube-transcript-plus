export interface YouTubeOEmbedResponse {
   title: string;
   author_name: string;
   author_url: string;

   type: string;
   version: string;

   provider_name: string;
   provider_url: string;

   thumbnail_url: string;
   thumbnail_width: number;
   thumbnail_height: number;

   width: number;
   height: number;

   html: string;
}

export interface YouTubeVideoMetadata {
   title: string;
   author: string;
   authorUrl: string;
   thumbnailUrl: string;
   duration: number;
}
