// scripts/transcript.ts
import { getTranscript } from "../src/services/transcript";
import { YouTubeTranscriptError } from "../src/errors/youtube-transcript";

async function testTranscript(videoId: string, lang?: string) {
   try {
      // Si 'lang' existe lo pasamos en el objeto; si no, pasamos undefined
      const config = lang ? { lang } : undefined;
      const transcript = await getTranscript(videoId, config);

      console.log("SUCCESS (primeros 2 segmentos):", transcript.slice(0, 2));
   } catch (error) {
      if (error instanceof YouTubeTranscriptError) {
         console.log("HANDLED_TRANSCRIPT_ERROR:", {
            name: error.name,
            code: error.code,
            status: error.status,
            message: error.message,
         });
      } else {
         console.error("UNKNOWN_ERROR:", error);
      }
   }
}

// 1. Probar un idioma inexistente
console.log("--- Test 1: Idioma inexistente ---");
await testTranscript("dQw4w9WgXcQ", "non-existent-language");

console.log("--- Test 2: Transcripción inexistente ---");
await testTranscript("zOmw5o8zXHM");

// 2. Probar éxito por defecto
console.log("\n--- Test 3: Obtener transcripción exitosa ---");
await testTranscript("dQw4w9WgXcQ");

console.log("end");