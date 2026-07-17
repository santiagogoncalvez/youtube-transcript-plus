import { parseYouTubeMetadata } from "../parsers/youtube-metadata";

import type {
   YouTubeOEmbedResponse,
   YouTubeVideoMetadata,
} from "../types/youtube";

const YOUTUBE_OEMBED_ENDPOINT = "https://www.youtube.com/oembed";

export async function getYouTubeMetadata(
   videoId: string,
): Promise<YouTubeVideoMetadata> {
   const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

   const endpoint = new URL(YOUTUBE_OEMBED_ENDPOINT);

   endpoint.searchParams.set("url", videoUrl);

   endpoint.searchParams.set("format", "json");

   const response = await fetch(endpoint);

   if (!response.ok) {
      throw new Error(`Unable to fetch YouTube metadata (${response.status})`);
   }

   const data: YouTubeOEmbedResponse = await response.json();

   return parseYouTubeMetadata(data);
}
