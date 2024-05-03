import { Playlist, PlaylistMusic } from "@/types/playlist";
import { IPlaylistRepository } from "./IPlaylistRepository";

const hardcodedPlaylists = [
  {
    name: "Playlist 1",
    id: "1",
    musics: [
      { id: "1", band: "Teste", title: "Titulo" },
      { id: "2", band: "Teste 2", title: "Titulo 2" },
    ],
  },
  {
    name: "Playlist 2",
    id: "2",
    musics: [
      { id: "1", band: "Teste playlist 2", title: "Titulo playlist 2" },
      { id: "2", band: "Teste playlist 2 2", title: "Titulo playlist 2 2" },
    ],
  },
];

export class HardcodedPlaylistRepository implements IPlaylistRepository {
  private playlists = JSON.parse(localStorage.getItem("playlists") || "[]") as Playlist[];

  async createPlaylist(name: string) {
    const id = Date.now().toString();

    this.playlists = [...this.playlists, { name, id, musics: [] }];

    localStorage.setItem("playlists", JSON.stringify(this.playlists));

    return { id };
  }

  async removePlaylist(playlistId: string) {
    this.playlists = this.playlists.filter(playlist => playlist.id != playlistId);

    localStorage.setItem("playlists", JSON.stringify(this.playlists));
  }

  async getPlaylists() {
    return this.playlists;
  }

  async getFullPlaylistData(playlistId: string) {
    return this.playlists.find(playlist => playlist.id == playlistId) || null;
  }

  async addMusicToPlaylist(playlistId: string, music: PlaylistMusic) {
    const playlist = await this.getFullPlaylistData(playlistId);

    if (!playlist) return;

    const playlistWithAddedMusic = { ...playlist, musics: [...playlist.musics, music] };

    const indexOfPlaylist = this.playlists.map(playlist => playlist.id).indexOf(playlistId);
    this.playlists[indexOfPlaylist] = playlistWithAddedMusic;

    localStorage.setItem("playlists", JSON.stringify(this.playlists));
  }

  async removeMusicFromPlaylist(playlistId: string, musicId: string) {
    const playlist = await this.getFullPlaylistData(playlistId);
    if (!playlist) return;

    const playlistWithRemovedMusic = playlist;

    const playlistMusicsWithoutMusic = playlistWithRemovedMusic.musics.filter(
      music => music.id !== musicId
    );
    playlistWithRemovedMusic.musics = playlistMusicsWithoutMusic;

    const indexOfPlaylist = this.playlists.map(playlist => playlist.id).indexOf(playlistId);
    this.playlists[indexOfPlaylist] = playlistWithRemovedMusic;

    localStorage.setItem("playlists", JSON.stringify(this.playlists));
  }
}
