import "dotenv/config";

import { YouTubeMetadataError } from "../errors/youtube-metadata";
import { parseYouTubeDuration } from "../parsers/youtube-duration";

export interface YouTubeVideoDetailsResponse {
   items: Array<{
      contentDetails: {
         duration: string;
      };
   }>;
}

const YOUTUBE_VIDEOS_ENDPOINT = "https://www.googleapis.com/youtube/v3/videos";

export async function getYouTubeDuration(videoId: string): Promise<number> {
   const apiKey = process.env.YOUTUBE_API_KEY;

   if (!apiKey) {
      throw new YouTubeMetadataError(
         "API_ERROR",
         "YouTube API key is not configured.",
      );
   }

   try {
      const endpoint = new URL(YOUTUBE_VIDEOS_ENDPOINT);

      endpoint.searchParams.set("part", "contentDetails");
      endpoint.searchParams.set("id", videoId);
      endpoint.searchParams.set("key", apiKey);

      const response = await fetch(endpoint);

      if (!response.ok) {
         if (response.status === 400) {
            throw new YouTubeMetadataError(
               "VIDEO_NOT_FOUND",
               "Invalid YouTube video ID.",
               response.status,
            );
         }

         if (response.status === 403) {
            throw new YouTubeMetadataError(
               "API_ERROR",
               "YouTube API access denied.",
               response.status,
            );
         }

         throw new YouTubeMetadataError(
            "API_ERROR",
            `YouTube API error (${response.status})`,
            response.status,
         );
      }

      const data: YouTubeVideoDetailsResponse = await response.json();

      const duration = data.items[0]?.contentDetails.duration;

      if (!duration) {
         throw new YouTubeMetadataError(
            "VIDEO_NOT_FOUND",
            "Video duration could not be obtained.",
         );
      }

      return parseYouTubeDuration(data);
   } catch (error) {
      if (error instanceof YouTubeMetadataError) {
         throw error;
      }

      console.error("Failed to fetch YouTube video duration:", error);

      throw new YouTubeMetadataError(
         "NETWORK_ERROR",
         error instanceof Error ? error.message : "Unknown network error",
      );
   }
}
