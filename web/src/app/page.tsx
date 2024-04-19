"use client";

import { Header } from "@/components/header";
import axios from "axios";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type APIMusic = {
  id: string;
  langID: number;
  url: string;
  title: string;
  band: string;
};

export default function Home() {
  const [musicsFound, setMusicsFound] = useState<APIMusic[] | null>(null);

  async function search(musicName: string) {
    const musicsFound: APIMusic[] = await axios
      .get(`https://api.vagalume.com.br/search.artmus?q=${musicName}&limit=10`)
      .then((res) => res.data.response.docs);

    setMusicsFound(musicsFound.filter((music) => music.title));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const searchValue = formData.get("search") as string;

    search(searchValue);
  }

  return (
    <>
      <Header />
      <main className="whitespace-break-spaces">
        <form onSubmit={onSubmit}>
          <input type="text" name="search" />
          <button type="submit">Pesquisar</button>
        </form>

        <ul>
          {musicsFound?.length == 0 && "Nenhuma música encontrada."}
          {musicsFound?.map((music) => (
            <li key={music.id}>
              <Link href={`/music/${music.id}`}>
                {music.title} - {music.band}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
