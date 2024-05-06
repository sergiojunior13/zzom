import { APIMusicData } from "@/types/music";
import axios from "axios";

export const fetchTopTracks = async (): Promise<APIMusicData[]> => {
  try {
    const response = await axios.get(`https://api.deezer.com/chart/0/tracks`, {
      params: {
        order: 'RANKING',
        limit: 5, 
      },
    });

    const { data: tracks } = response;

    return tracks.data.map((track: any) => ({
      id: track.id,
      readable: track.readable,
      title: track.title,
      title_short: track.title_short,
      title_version: track.title_version,
      link: track.link,
      duration: track.duration,
      rank: track.rank,
      explicit_lyrics: track.explicit_lyrics,
      explicit_content_lyrics: track.explicit_content_lyrics,
      explicit_content_cover: track.explicit_content_cover,
      preview: track.preview,
      md5_image: track.md5_image,
      artist: {
        id: track.artist.id,
        name: track.artist.name,
        link: track.artist.link,
        picture: track.artist.picture,
        picture_small: track.artist.picture_small,
        picture_medium: track.artist.picture_medium,
        picture_big: track.artist.picture_big,
        picture_xl: track.artist.picture_xl,
        tracklist: track.artist.tracklist,
        type: track.artist.type,
      },
      album: {
        id: track.album.id,
        title: track.album.title,
        cover: track.album.cover,
        cover_small: track.album.cover_small,
        cover_medium: track.album.cover_medium,
        cover_big: track.album.cover_big,
        cover_xl: track.album.cover_xl,
        md5_image: track.album.md5_image,
        tracklist: track.album.tracklist,
        type: track.album.type,
      },
      type: track.type,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function main() {
   const topTracks = await fetchTopTracks();

  topTracks.forEach((track) => {
    console.log(`Rank ${track.rank}: ${track.title} by ${track.artist.name}`);
  });
}

main();

