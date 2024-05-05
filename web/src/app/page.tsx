"use client";
import { Home, Search, Library } from "lucide-react";
import { AsideMenu } from '@/components/asidemenu'
import { PlayerFooter } from "@/components/playerfooter";
import { useState, useEffect } from "react";



export default function HomeLayout() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 gap-2 p-1.5 ">
        <AsideMenu />
        <main className="flex flex-col w-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md">
          <header className="bg-transparent h-16  p-3">
          </header>
          <div className="p-6 bg-transparent">
            <h2 className="font-semibold text-3xl nt-10"> Álbuns Populares </h2>
            <div className="flex gap-5">
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-zinc-950 border-t border-zinc-700 p-6 sticky bottom-0 w-screen text-center flex items-center justify-between">
        <PlayerFooter />
      </footer>
    </div>
  )
}