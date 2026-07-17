import { generateTranscript } from "../src/services/youtube-summary";

const youtubeId = "dQw4w9WgXcQ";

const data = await generateTranscript(youtubeId);

console.log(data);
