export interface TranscriptSegment {
   text: string;
   start: number;
   end: number;
   duration: number;
}

export interface TranscriptData {
   title: string;
   videoId: string;
   thumbnailUrl?: string;
   fullTranscript: string;
   transcriptWithTimeCodes: TranscriptSegment[];
   duration: number;
}
