"use client";

import { Section } from "@/components/section";
import { playlistRepository } from "@/repositories/back-end/playlist/playlistRepository";
import { Playlist, PlaylistMusic } from "@/types/playlist";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiTrashBold } from "react-icons/pi";

export default function FullPlaylistData({ params }: { params: { playlistId: string } }) {
  const { playlistId } = params;

  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    playlistRepository.getFullPlaylistData(playlistId).then(setPlaylist);
  }, []);

  if (!playlist) {
    return (
      <Section className="my-14 max-w-3xl w-full m-auto text-center">
        Essa playlist não existe.
      </Section>
    );
  }

  return (
    <Section className="my-14 max-w-3xl w-full m-auto">
      <h1 className="text-3xl font-bold">{playlist.name}</h1>
      <span className="text-zinc-200">{playlist.musics.length} músicas</span>

      <ul className="mt-4">
        {playlist.musics.map(music => (
          <MusicCard {...music} playlistId={playlistId} />
        ))}
      </ul>
    </Section>
  );
}

const MusicCard = ({
  id,
  band,
  title,
  playlistId,
  imgSrc,
}: PlaylistMusic & { playlistId: string }) => {
  const router = useRouter();
  async function deleteMusic() {
    await playlistRepository.removeMusicFromPlaylist(playlistId, id);

    router.refresh();
  }

  return (
    <li key={id} className="p-3 rounded-lg hover:bg-zinc-800 flex justify-between items-center">
      <Link href={`/music/${id}`} className="flex gap-3 items-center">
        <img src={imgSrc} alt={`capa da música ${title}`} className="rounded-lg h-20 w-auto" />
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-zinc-200">{band}</p>
        </div>
      </Link>
      <button onClick={deleteMusic} className="hover:text-red-500">
        <PiTrashBold size={24} />
      </button>
    </li>
  );
};
