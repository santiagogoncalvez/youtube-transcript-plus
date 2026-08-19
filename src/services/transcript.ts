// src/services/transcript.ts

import {
   fetchTranscript,
   YoutubeTranscriptDisabledError,
   YoutubeTranscriptNotAvailableError,
   YoutubeTranscriptNotAvailableLanguageError,
   YoutubeTranscriptTooManyRequestError,
   YoutubeTranscriptVideoUnavailableError,
   YoutubeTranscriptError,
   type TranscriptConfig,
   type TranscriptResponse,
} from "youtube-transcript";

import { YouTubeTranscriptError } from "../errors/youtube-transcript";

export async function getTranscript(
   videoId: string,
   config?: TranscriptConfig,
): Promise<TranscriptResponse[]> {
   try {
      const transcriptSegments = await fetchTranscript(videoId, config);
      return transcriptSegments;
   } catch (error) {
      // 1. Subtítulos desactivados por el creador
      if (error instanceof YoutubeTranscriptDisabledError) {
         throw new YouTubeTranscriptError(
            "TRANSCRIPT_DISABLED",
            "Transcript is disabled on this video.",
            400,
         );
      }

      // 2. Idioma no disponible
      if (error instanceof YoutubeTranscriptNotAvailableLanguageError) {
         throw new YouTubeTranscriptError(
            "LANGUAGE_NOT_AVAILABLE",
            error.message,
            400,
         );
      }

      // 3. Video o transcripción no encontrada / no disponible
      if (
         error instanceof YoutubeTranscriptVideoUnavailableError ||
         error instanceof YoutubeTranscriptNotAvailableError
      ) {
         throw new YouTubeTranscriptError(
            "TRANSCRIPT_NOT_FOUND",
            "No transcripts found for this video.",
            404,
         );
      }

      // 4. Rate limit / Captcha requerido por YouTube
      if (error instanceof YoutubeTranscriptTooManyRequestError) {
         throw new YouTubeTranscriptError(
            "TOO_MANY_REQUESTS",
            "Too many requests from this IP. YouTube requires captcha.",
            429,
         );
      }

      // 5. Otros errores de la librería interna
      if (error instanceof YoutubeTranscriptError) {
         throw new YouTubeTranscriptError(
            "TRANSCRIPT_ERROR",
            error.message,
            500,
         );
      }

      // Fallback para errores de red descontrolados
      const message =
         error instanceof Error
            ? error.message
            : "An unexpected error occurred";
      throw new YouTubeTranscriptError("TRANSCRIPT_ERROR", message, 500);
   }
}
