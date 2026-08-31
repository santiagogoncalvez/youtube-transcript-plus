import { YouTubeMetadataError } from "../errors/youtube-metadata";
import { parseYouTubeMetadata } from "../parsers/youtube-metadata";

import type {
   YouTubeOEmbedResponse,
   YouTubeVideoMetadata,
} from "../types/youtube";
import { getYouTubeDuration } from "./get-youtube-duration";

const YOUTUBE_OEMBED_ENDPOINT = "https://www.youtube.com/oembed";

export async function getYouTubeMetadata(
   videoId: string,
): Promise<YouTubeVideoMetadata> {
   try {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      const endpoint = new URL(YOUTUBE_OEMBED_ENDPOINT);
      endpoint.searchParams.set("url", videoUrl);
      endpoint.searchParams.set("format", "json");

      const [response, duration] = await Promise.all([
         fetch(endpoint),
         getYouTubeDuration(videoId),
      ]);

      if (!response.ok) {
         if (response.status === 404 || response.status === 400) {
            throw new YouTubeMetadataError(
               "VIDEO_NOT_FOUND",
               "Video not found or deleted.",
               response.status,
            );
         }
         if (response.status === 401 || response.status === 403) {
            throw new YouTubeMetadataError(
               "VIDEO_PRIVATE",
               "The video is private.",
               response.status,
            );
         }
         throw new YouTubeMetadataError(
            "API_ERROR",
            `YouTube error (${response.status})`,
            response.status,
         );
      }

      const data: YouTubeOEmbedResponse = await response.json();

      return {
         ...parseYouTubeMetadata(data),
         duration,
      };
   } catch (error) {
      // Si el error ya es nuestro (lo lanzamos arriba), lo dejamos pasar tal cual
      if (error instanceof YouTubeMetadataError) {
         throw error;
      }

      // Si es un error de fetch() o json() que rompió el código, lo empaquetamos como NETWORK_ERROR
      console.error("Failed to fetch YouTube metadata:", error);

      throw new YouTubeMetadataError(
         "NETWORK_ERROR",
         error instanceof Error ? error.message : "Unknown network error",
      );
   }
}
