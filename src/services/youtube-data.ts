import { getYouTubeMetadata } from "./youtube-metadata";

import { getTranscript } from "./transcript";

import { mapTranscriptSegments } from "../parsers/transcript";

import type { TranscriptData } from "../types/transcript";

export async function getYoutubeData(videoId: string): Promise<TranscriptData> {
   const [metadata, transcriptSegments] = await Promise.all([
      getYouTubeMetadata(videoId),
      getTranscript(videoId),
   ]);

   const transcriptWithTimeCodes = mapTranscriptSegments(transcriptSegments);

   const fullTranscript = transcriptWithTimeCodes
      .map(({ text }) => text)
      .join(" ");

   return {
      title: metadata.title,
      videoId,
      thumbnailUrl: metadata.thumbnailUrl,
      fullTranscript,
      transcriptWithTimeCodes,
      duration: metadata.duration,
   };
}
