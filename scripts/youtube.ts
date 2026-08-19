import { YouTubeMetadataError } from "../src";
import { getYouTubeMetadata } from "../src/services/youtube-metadata";

async function test(id: string) {
   try {
      const data = await getYouTubeMetadata(id);
      console.log("SUCCESS:", data);
   } catch (error) {
      if (error instanceof YouTubeMetadataError) {
         console.log("HANDLED_ERROR:", {
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

const id = "0qD2qKezO4w";

await test(id);
console.log("end");