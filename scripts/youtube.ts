import { getYouTubeMetadata } from "../src/services/youtube-metadata";

const metadata = await getYouTubeMetadata("noFhUkOZ0L0");

console.log(metadata);
