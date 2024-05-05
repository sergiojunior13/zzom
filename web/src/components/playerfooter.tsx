import { Shuffle, SkipBack, Play, SkipForward, Repeat } from "lucide-react";

export function PlayerFooter() {
  return (
    <div className="flex justify-between items-center gap-3 w-full">

      <div className="flex items-center gap-3">
        <img src="/nf.jpeg" width="56" height="56" alt="foto do álbum" />
        <div className="flex flex-col">
          <strong className="font-normal">Teste</strong>
          <span className="text-xs text-gray-400">Nome do Artista</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-6 ">
          <Shuffle size={24} className="text-gray-200" />
          <SkipBack size={24} className="text-gray-200" />
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black">
            <Play size={24} />
          </button>
          <SkipForward size={24} className="text-gray-200" />
          <Repeat size={24} className="text-gray-200" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">00:01</span>
          <span className="text-xs text-zinc-500">00:30</span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
