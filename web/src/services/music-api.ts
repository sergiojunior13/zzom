import { SearchMusicFromLyricsAPIResponse } from "@/types/lyrics-api-response";
import { APIMusicData } from "@/types/music";
import axios from "axios";

export class MusicAPI {
  static async searchMusics(searchValue: string) {
    const musicsFound = await axios
      .get<{ data: APIMusicData[] }>(`https://api.deezer.com/search?q=${searchValue}`)
      .then(res => res.data.data);

    if (!musicsFound) return [];

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

    const lyrics = await MusicAPI.getMusicLyrics(
      fullMusicData.title_short,
      fullMusicData.artist.name
    ).catch(e => `Letra da música não encontrada. (Erro: ${e.message || "Desconhecido"})`);

    return {
      music: fullMusicData,
      lyrics,
      artist,
      musicContainsBadWords,
    };
  }

  static async getMusicLyrics(musicTitle: string, musicArtist: string) {
    const musicsFoundFromLyricsAPI = await axios
      .get<SearchMusicFromLyricsAPIResponse>(
        `https://api.vagalume.com.br/search.excerpt?q=${musicTitle}&limit=10`
      )
      .then(res => res.data.response.docs);

    const musicFoundGivenTitleAndArtist = musicsFoundFromLyricsAPI?.find(
      music =>
        music.band.toLowerCase() == musicArtist.toLowerCase() &&
        music.title.toLowerCase() == musicTitle.toLowerCase()
    );

    if (!musicsFoundFromLyricsAPI || !musicFoundGivenTitleAndArtist)
      return "Letra da música não encontrada.";

    const lyrics = await axios
      .get(`https://api.vagalume.com.br/search.php?musid=${musicFoundGivenTitleAndArtist.id}`)
      .then(res => res?.data?.mus[0]?.text as string | null);

    if (!lyrics) return "Letra da música não encontrada.";

    return lyrics;
  }
}
