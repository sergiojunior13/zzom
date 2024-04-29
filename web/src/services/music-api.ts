import { APIMusicData } from "@/types/music";
import axios from "axios";

export class MusicAPI {
  static async searchMusics(searchValue: string) {
    const musicsFound = await axios
      .get<{data: APIMusicData[]}>(`https://api.deezer.com/search?q=${searchValue}`)
      .then(res => res.data.data)

      if(!musicsFound) return []

    return musicsFound;
  }

  static async getFullMusicData(musicId: string) {
    const fullMusicData = await axios
      .get(`https://api.deezer.com/track/${musicId}`)
      .then(res => res.data as APIMusicData);

    const musicWasFound = !!fullMusicData;

    if (!musicWasFound) throw new Error("Music not found");

    const artist = fullMusicData.artist.name;

    const musicContainsBadWords = fullMusicData.explicit_lyrics;

    return {
      music: fullMusicData,
      artist,
      musicContainsBadWords,
    };
  }
}
