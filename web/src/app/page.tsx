"use client";

import { FormEvent, useState, Suspense } from "react";

import { APIMusicData } from "@/types/music";
import { MusicAPI } from "@/services/music-api";
import { MusicsList } from "@/components/music-list";
import { Spinner } from "@/components/spinner";

export default function Home() {
  const [musicsFoundPromise, setMusicsFoundPromise] = useState<Promise<APIMusicData[]>>();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchValue = formData.get("search") as string;

    const musicsFoundFromAPI = MusicAPI.searchMusics(searchValue);

    setMusicsFoundPromise(musicsFoundFromAPI);
  }

  return (
    <main className="whitespace-break-spaces p-6 flex flex-col items-center gap-10 max-w-3xl m-auto">
      <h1 className="text-4xl">Encontre suas músicas favoritas!</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          name="search"
          placeholder="Pesquise uma música..."
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 outline-indigo-900 placeholder:text-zinc-600"
        />
        <button
          type="submit"
          className="w-full p-2 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-medium"
        >
          Pesquisar
        </button>
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
