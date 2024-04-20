import { APIFullMusicData, APIMusicData } from "@/types/music";
import axios from "axios";

export class MusicAPI {
  static async searchMusics(searchValue: string) {
    const musicsAndArtistsFound: APIMusicData[] = await axios
      .get(`https://api.vagalume.com.br/search.artmus?q=${searchValue}&limit=15`)
      .then(res => res.data.response.docs);

    const onlyMusicsFound = musicsAndArtistsFound.filter(music => music.title);
    return onlyMusicsFound;
  }

  static async getFullMusicData(musicId: string) {
    const fullMusicData = await axios
      .get(`https://api.vagalume.com.br/search.php?musid=${musicId}`)
      .then(res => res.data as APIFullMusicData);

    const musicWasFound = !!fullMusicData?.mus[0];

    if (!musicWasFound) throw new Error("Music not found");

    const music = fullMusicData.mus[0];
    const artist = fullMusicData.art;

    const musicContainsBadWords = fullMusicData.badwords;

    return {
      music,
      artist,
      musicContainsBadWords,
    };
  }
}
