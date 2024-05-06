"use client";
import { Home, Search, Library } from "lucide-react";
import { AsideMenu } from '@/components/asidemenu'
import { PlayerFooter } from "@/components/playerfooter";
import { useState, useEffect } from "react";
import { CardArea } from "@/components/cardArea";
import { fetchTopTracks } from "@/services/rank-api";
import { MainHeader } from "@/components/mainheader";



export default function HomeLayout() {
  return (
    <div className="h-screen">
      <div className="flex flex-col h-screen">
      <div className="flex flex-1 gap-2 p-1.5 h-96  ">
        <AsideMenu />
        <main className="flex flex-col w-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-md overflow-y-auto">
            <MainHeader />
          
            <CardArea />
            <CardArea />
            <CardArea />
          
         <hr className="mr-8 ml-8 border-zinc-700"/>
         <div className="p-8 mb-8 flex justify-between">
            <p className="ml-6">&copy; ZZOM</p>
            <a href="" className="mr-6 hover:underline">Deixe seu feedback</a>
         </div>
        </main>
      </div>
        <footer className="bg-zinc-950 border-t border-zinc-700 h-20 p-4 bottom-0 w-screen text-center flex items-center justify-between">
        <PlayerFooter />
      </footer>
      </div>
      
    </div>
  )
}
