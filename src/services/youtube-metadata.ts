import { parseYouTubeMetadata } from "../parsers/youtube-metadata";

import type {
   YouTubeOEmbedResponse,
   YouTubeVideoMetadata,
} from "../types/youtube";

const YOUTUBE_OEMBED_ENDPOINT = "https://www.youtube.com/oembed";

export async function getYouTubeMetadata(
   videoId: string,
): Promise<YouTubeVideoMetadata> {
   try {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      const endpoint = new URL(YOUTUBE_OEMBED_ENDPOINT);

      endpoint.searchParams.set("url", videoUrl);

      endpoint.searchParams.set("format", "json");

      const response = await fetch(endpoint);

      if (!response.ok) {
         if (response.status === 404) {
            throw new Error("Video not found or has been deleted.");
         }
         if (response.status === 401 || response.status === 403) {
            throw new Error("The video is private.");
         }
         throw new Error(`YouTube error (${response.status})`);
      }

      const data: YouTubeOEmbedResponse = await response.json();

      return parseYouTubeMetadata(data);
   } catch (error) {
      // Here you catch errors thrown above, as well as fetch() or json() failures
      console.error("Failed to fetch YouTube metadata:", error);
      throw error;
   }
}
