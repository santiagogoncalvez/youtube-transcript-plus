// src/errors/youtube-metadata.ts

export type YouTubeErrorCode =
   "VIDEO_NOT_FOUND" | "VIDEO_PRIVATE" | "API_ERROR" | "NETWORK_ERROR";

export class YouTubeMetadataError extends Error {
   public code: YouTubeErrorCode;
   public status?: number | undefined;

   constructor(code: YouTubeErrorCode, message: string, status?: number) {
      super(message);
      this.name = "YouTubeMetadataError";
      this.code = code;
      this.status = status;
   }
}
