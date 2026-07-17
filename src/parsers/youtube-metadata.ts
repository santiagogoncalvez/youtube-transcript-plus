import type {
   YouTubeOEmbedResponse,
   YouTubeVideoMetadata,
} from "../types/youtube";

export function parseYouTubeMetadata(
   data: YouTubeOEmbedResponse,
): YouTubeVideoMetadata {
   return {
      title: data.title,
      author: data.author_name,
      authorUrl: data.author_url,
      thumbnailUrl: data.thumbnail_url,
   };
}
