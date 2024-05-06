"use client";
import { Home, Search, Library, ClipboardPenLine } from "lucide-react";
import { AsideMenu } from "@/components/asidemenu";
import { PlayerFooter } from "@/components/playerfooter";
import { useState, useEffect } from "react";
import { CardArea } from "@/components/cardArea";
import { fetchTopTracks } from "@/services/rank-api";
import { MainHeader } from "@/components/mainheader";
import { Header } from "@/components/header";

export default function HomeLayout() {
  return (
    <main className="flex flex-col w-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md overflow-y-auto">
      <Header />

      <CardArea />
      <CardArea />
      <CardArea />

      <hr className="mr-8 ml-8 border-zinc-700" />
      <div className="p-8 mb-8 flex justify-between">
        <p className="ml-6">&copy; ZZOM</p>
        <a
          title="Deixe sua avaliação"
          href="https://forms.gle/BTXwaj4BF7VmKHpY6"
          target="_blank"
          className="mr-6 hover:underline"
        >
          <ClipboardPenLine />
        </a>
      </div>
    </main>
  );
}
