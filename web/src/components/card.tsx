import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIMusicData } from "@/types/music";
import { fetchTopTracks } from "@/services/rank-api";
import Link from "next/link";

interface CardProps {
  id: string;
  title: string;
  artist: {
    id: string;
    name: string;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    tracklist: string;
    type: string;
  };
  image: string;
}
export function Card({ title, artist, image, id }: CardProps) {
  return (
    <Link
      href={`/music/${id}`}
      className="flex flex-col mt-1 justify-center h-full w-64 gap-3 rounded-lg hover:bg-zinc-800 items-center p-8 relative"
    >
      <img
        src={image}
        alt="Capa do álbum"
        className="rounded-lg h-quadrado w-quadrado"
      />
      <div className="flex items-start w-full flex-col font-semibold">
        {title}
        <p className="text-zinc-300 text-sm">{artist.name}</p>
      </div>
    </Link>
  );
}

export function TopTracks() {
  const [topTracks, setTopTracks] = useState<APIMusicData[]>([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get(
          `https://api.deezer.com/chart/0/tracks`,
          {
            params: {
              order: "RANKING",
              limit: 5,
            },
          }
        );

        const { data: tracks } = response;

        setTopTracks(
          tracks.data.map((track: APIMusicData) => ({
            ...track,
            id: track.id,
            rank: track.rank,
            image: `https://e-cdns-images.dzcdn.net/images/artist/${track.md5_image}/500x500-000000-80-0-0.jpg`,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopTracks();
  }, []);
  console.log(TopTracks);
  return (
    <div className="flex flex-wrap justify-center">
      {topTracks.map((track) => (
        <Card
          key={track.id}
          title={track.title}
          artist={track.artist}
          image={track.album.cover_medium}
          id={track.id}
        />
      ))}
    </div>
  );
}
