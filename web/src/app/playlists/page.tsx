"use client";

import { Button } from "@/components/button";
import { Section } from "@/components/section";
import { playlistRepository } from "@/repositories/back-end/playlist/playlistRepository";
import { Playlist } from "@/types/playlist";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiPlusBold } from "react-icons/pi";

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    playlistRepository.getPlaylists().then(setPlaylists);
  }, []);

  if (!playlists || playlists.length == 0) {
    return (
      <Section className="my-14 max-w-3xl w-full m-auto px-8">
        <p className="text-center mb-4">Você não possui nenhuma playlist.</p>

        <CreatePlaylistButton />
      </Section>
    );
  }

  return (
    <Section className="my-14 max-w-3xl w-full m-auto">
      <h1 className="text-xl font-bold text-center mb-4">Suas Playlists</h1>

      <ul>
        {playlists.map(playlist => (
          <PlaylistCard {...playlist} />
        ))}
      </ul>

      <CreatePlaylistButton />
    </Section>
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
