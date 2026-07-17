import { fetchTranscript, type TranscriptResponse } from "youtube-transcript";

export async function getTranscript(
   videoId: string,
): Promise<TranscriptResponse[]> {
   const transcriptSegments = await fetchTranscript(videoId, {});

   return transcriptSegments;
}
