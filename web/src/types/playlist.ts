export type Playlist = {
  id: string;
  name: string;
  musics: PlaylistMusic[];
};

export type PlaylistMusic = {
  title: string;
  band: string;
  id: string;
  imgSrc: string;
};
