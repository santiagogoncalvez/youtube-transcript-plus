import type { TranscriptSegment } from "../types/transcript";
import type { TranscriptResponse } from "youtube-transcript";

export function mapTranscriptSegments(
   segments: TranscriptResponse[],
): TranscriptSegment[] {
   return segments.map((segment) => ({
      text: segment.text,
      start: segment.offset,
      end: segment.offset + segment.duration,
      duration: segment.duration,
   }));
}
