"use client";

import { Button } from "@/components/button";
import { Section } from "@/components/section";
import { playlistRepository } from "@/repositories/back-end/playlist/playlistRepository";
import { Playlist } from "@/types/playlist";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { Home, Search, Library } from "lucide-react";
import { BackEndPlaylistRepository } from "@/repositories/back-end/playlist/backEndPlaylistRepository";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    playlistRepository.getPlaylists().then(setPlaylists);

    new BackEndPlaylistRepository().getFullPlaylistData("0").then(console.log);
  }, []);

  if (!playlists || playlists.length == 0) {
    return (
      <div className="my-14 w-full">
        <p className="text-center mb-4">Você não possui nenhuma playlist.</p>

        <CreatePlaylistButton />
      </div>
    );
  }

  return (
    <div className="my-14 w-full m-auto">
      <ul>
        {playlists.map((playlist) => (
          <PlaylistCard {...playlist} />
        ))}
      </ul>

      <CreatePlaylistButton />
    </div>
  );
}

const PlaylistCard = ({ name, id, musics }: Playlist) => {
  return (
    <li key={id} className="p-3 rounded-lg hover:bg-zinc-800">
      <Link href={`/playlists/${id}`}>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-zinc-200">{musics.length} músicas</p>
      </Link>
    </li>
  );
};

const CreatePlaylistButton = () => (
  <Link href="/playlists/new">
    <Button className="mt-2">
      <PiPlusBold size={24} className="mr-1" /> Adicionar Playlist
    </Button>
  </Link>
);
