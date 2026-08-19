// src/errors/youtube-transcript.ts

export type YouTubeTranscriptErrorCode =
   | "TRANSCRIPT_DISABLED"
   | "TRANSCRIPT_NOT_FOUND"
   | "LANGUAGE_NOT_AVAILABLE"
   | "TOO_MANY_REQUESTS"
   | "TRANSCRIPT_ERROR";

export class YouTubeTranscriptError extends Error {
   public code: YouTubeTranscriptErrorCode;
   public status?: number | undefined;

   constructor(
      code: YouTubeTranscriptErrorCode,
      message: string,
      status?: number,
   ) {
      super(message);
      this.name = "YouTubeTranscriptError";
      this.code = code;
      this.status = status;
   }
}
