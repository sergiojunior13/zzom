import { Playlist, PlaylistMusic } from "@/types/playlist";

export interface IPlaylistRepository {
  createPlaylist(name: string): Promise<{ id: string }>;
  removePlaylist(playlistId: string): Promise<void>;
  getPlaylists(): Promise<Playlist[]>;
  getFullPlaylistData(playlistId: string): Promise<Playlist | null>;

  addMusicToPlaylist(playlistId: string, music: PlaylistMusic): Promise<void>;
  removeMusicFromPlaylist(playlistId: string, musicId: string): Promise<void>;
}
