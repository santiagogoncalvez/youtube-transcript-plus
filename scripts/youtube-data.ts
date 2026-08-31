import { getYoutubeData } from "../src/services/youtube-data";

const youtubeId = "2nEiIG-xca4";

const data = await getYoutubeData(youtubeId);

console.log(data);

console.log("");