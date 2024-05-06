import { Playlist, PlaylistMusic } from "@/types/playlist";
import { IPlaylistRepository } from "./IPlaylistRepository";
import { API } from "@/services/back-end";
import { AuthStorage } from "@/services/auth-storage";

export class BackEndPlaylistRepository implements IPlaylistRepository {
  async addMusicToPlaylist(playlistId: string, music: PlaylistMusic) {
    const username = AuthStorage.getUsername();

    const { data } = await API.post("/classes.php?func=addMusicToPlaylist", {
      params: [username, playlistId, music.id, music.band, music.title, music.imgSrc],
    });

    return data;
  }

  async removeMusicFromPlaylist(playlistId: string, musicId: string) {
    const username = AuthStorage.getUsername();

    const { data } = await API.post("/classes.php?func=removeMusicFromPlaylist", {
      params: [username, playlistId, musicId],
    });

    return data;
  }

  async getFullPlaylistData(playlistId: string): Promise<Playlist | null> {
    const username = AuthStorage.getUsername();

    const params = JSON.stringify([username, playlistId]);

    const playlist = await API.get<Playlist>(
      `classes.php?func=getFullPlaylistData&params=${params}`
    ).then(res => (typeof res.data == "string" ? null : res.data));

    if (!playlist) return null;

    playlist.musics = Object.values(playlist.musics);

    return playlist;
  }

  async createPlaylist(name: string): Promise<{ id: string }> {
    const username = AuthStorage.getUsername();

    const { data: id } = await API.post("/classes.php?func=createPlaylist", {
      params: [username, name],
    });

    return id;
  }

  async removePlaylist(playlistId: string) {
    const username = AuthStorage.getUsername();

    await API.post("/classes.php?func=removePlaylist", {
      params: [username, playlistId],
    });
  }

  async getPlaylists(): Promise<Playlist[]> {
    const username = AuthStorage.getUsername();

    const params = JSON.stringify([username]);

    const { data: playlists } = await API.get<Playlist[]>(
      `/classes.php?func=getPlaylists&params=${params}`
    );

    const convertedPlaylists = Object.values(playlists);
    convertedPlaylists.map(playlist => (playlist.musics = Object.values(playlist.musics)));

    return convertedPlaylists;
  }
}
