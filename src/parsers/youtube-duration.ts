import type { YouTubeVideoDetailsResponse } from "../services/get-youtube-duration";

export function parseYouTubeDuration(
   data: YouTubeVideoDetailsResponse,
): number {
   const duration = data.items[0]?.contentDetails.duration;

   if (!duration) {
      throw new Error("YouTube video duration not found.");
   }

   // PT1H4M20S → 3860
   const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);

   if (!match) {
      throw new Error(`Invalid YouTube duration format: ${duration}`);
   }

   const [, hours, minutes, seconds] = match;

   return (
      Number(hours ?? 0) * 3600 +
      Number(minutes ?? 0) * 60 +
      Number(seconds ?? 0)
   );
}
