"use client";

import { useEffect, useState } from "react";
import { Playlist, PlaylistMusic } from "@/types/playlist";
import { playlistRepository } from "@/repositories/back-end/playlist/playlistRepository";
import { PiXBold } from "react-icons/pi";

export function AddToPlaylistButton({ music }: { music: PlaylistMusic }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    playlistRepository.getPlaylists().then(setPlaylists);
  }, []);

  async function addMusicToPlaylist(playlistId: string) {
    await playlistRepository.addMusicToPlaylist(playlistId, music);
  }

  const Modal = () => {
    if (isModalOpen)
      return (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black/60">
          <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-xl mr-2">Adicionar música à Playlist</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <PiXBold size={24} />
              </button>
            </div>

            <ul>
              {playlists.map(playlist => (
                <PlaylistCard {...playlist} />
              ))}
            </ul>
          </div>
        </div>
      );

    return;
  };

  const PlaylistCard = ({ name, id, musics }: Playlist) => {
    return (
      <li
        key={id}
        className="p-3 rounded-lg hover:bg-zinc-700 cursor-pointer"
        onClick={() => {
          addMusicToPlaylist(id);
          setIsModalOpen(false);
        }}
      >
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-zinc-200">{musics.length} músicas</p>
      </li>
    );
  };

  return (
    <>
      <button className="text-indigo-600 font-medium" onClick={() => setIsModalOpen(!isModalOpen)}>
        Adicionar à Playlist
      </button>
      <Modal />
    </>
  );
}
