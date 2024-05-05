"use client";
import { Home, Search, Library } from "lucide-react";


import { FormEvent, useState, Suspense, Children } from "react";
import { APIMusicData } from "@/types/music";
import { MusicAPI } from "@/services/music-api";
import { MusicsList } from "@/components/music-list";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { AreaLibrary } from "@/components/arealibrary"
import { Header } from "@/components/header";
import { Card } from '@/components/card'
import { AsideMenu } from '@/components/asidemenu'
import { PlayerFooter } from "@/components/playerfooter";

// export default function Home() {
//   const [musicsFoundPromise, setMusicsFoundPromise] = useState<Promise<APIMusicData[]>>();

//   function onSubmit(e: FormEvent) {
//     e.preventDefault();
//     const formData = new FormData(e.target as HTMLFormElement);
//     const searchValue = formData.get("search") as string;

//     const musicsFoundPromiseFromAPI = MusicAPI.searchMusics(searchValue);

//     setMusicsFoundPromise(musicsFoundPromiseFromAPI);
//   }

//   return (
//   //   <main className="whitespace-break-spaces p-6 flex flex-col items-center gap-10 max-w-3xl m-auto">
//       <h1 className="text-4xl">Encontre suas músicas favoritas!</h1>

  //     <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
  //       <Input type="text" name="search" placeholder="Pesquise uma música..." />
  //       <Button type="submit">Pesquisar</Button>
  //     </form>

  //     <Suspense
  //       fallback={
  //         <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 w-full flex justify-center">
  //           <Spinner />
  //         </div>
  //       }
  //     >
  //       <MusicsList musicsPromise={musicsFoundPromise} />
  //     </Suspense>
  //   </main>
  // );
// }

export default function HomeLayout () {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 gap-2 p-1.5 h-full">
        <AsideMenu />
        <main className="flex flex-col w-full h-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md overflow-y-auto">
          <header className="bg-transparent h-8  p-3">
          </header>
          <div className="p-6 bg-transparent">
          <h2 className="font-semibold text-3xl nt-10"> Álbuns Populares </h2>
          <div className="flex gap-5 justify-starter">
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           </div>
          </div>
          <div className="p-6 bg-transparent">
          <h2 className="font-semibold text-3xl nt-10"> Álbuns Populares </h2>
          <div className="flex gap-5 justify-starter">
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           </div>
          </div>
        </main>
        
      </div>
      <footer className="bg-zinc-950 border-t border-zinc-700 p-6 relative bottom-0 w-screen text-center flex items-center justify-between">
      <PlayerFooter />
      </footer>
    </div>
  )
}

