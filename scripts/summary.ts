import { getYoutubeData } from "../src/services/youtube-summary";

const youtubeId = "dQw4w9WgXcQ";

const data = await getYoutubeData(youtubeId);

console.log(data);
