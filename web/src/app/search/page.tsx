"use client";
import { FormEvent, useState, Suspense, Children } from "react";
import { APIMusicData } from "@/types/music";
import { MusicAPI } from "@/services/music-api";
import { MusicsList } from "@/components/music-list";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Header } from "@/components/header";

export default function Home() {
  const [musicsFoundPromise, setMusicsFoundPromise] = useState<Promise<APIMusicData[]>>();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchValue = formData.get("search") as string;

    const musicsFoundPromiseFromAPI = MusicAPI.searchMusics(searchValue);

    setMusicsFoundPromise(musicsFoundPromiseFromAPI);
  }

  return (
  
    <main className="whitespace-break-spaces p-6 flex flex-col items-center gap-10 max-w-3xl m-auto">
      <h1 className="text-4xl">Encontre suas músicas favoritas!</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
        <Input type="text" name="search" placeholder="Pesquise uma música..." />
        <Button type="submit">Pesquisar</Button>
      </form>

      <Suspense
        fallback={
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 w-full flex justify-center">
            <Spinner />
          </div>
        }
      >
        <MusicsList musicsPromise={musicsFoundPromise} />
      </Suspense>
    </main>
  );
}