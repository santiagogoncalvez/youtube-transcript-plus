export { getYoutubeData } from "./services/youtube-data";

export { getTranscript } from "./services/transcript";

export { getYouTubeMetadata } from "./services/youtube-metadata";

export type { TranscriptData, TranscriptSegment } from "./types/transcript";

export type {
   YouTubeOEmbedResponse,
   YouTubeVideoMetadata,
} from "./types/youtube";

// Errors
export { YouTubeMetadataError } from "./errors/youtube-metadata";
export type { YouTubeErrorCode } from "./errors/youtube-metadata";

export { YouTubeTranscriptError } from "./errors/youtube-transcript";
export type { YouTubeTranscriptErrorCode } from "./errors/youtube-transcript";
