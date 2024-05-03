"use client";

import { FormEvent } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Section } from "@/components/section";
import { playlistRepository } from "@/repositories/back-end/playlist/playlistRepository";
import { useRouter } from "next/navigation";

export default function NewPlaylist() {
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const playlistName = formData.get("playlist-name") as string;

    await playlistRepository.createPlaylist(playlistName);

    router.back();
  }

  return (
    <Section >
      <h1 className="font-bold text-xl text-center">Criar Playlist</h1>
      <form onSubmit={onSubmit} className="mt-4">
        <Input
          type="text"
          placeholder="Nome da playlist..."
          name="playlist-name"
          className="w-full"
        />
        <Button type="submit" className="mt-2">
          Criar
        </Button>
      </form>
    </Section>
  );
}
