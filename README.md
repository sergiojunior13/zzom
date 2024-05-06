Como iniciar a aplicação web:
- instale o `node`;
- rode `cd web` no terminal;
- agora digite `npm install`;
- agora digite `npm run dev`;
- abra o link que aparecer no terminal.



MusicList com player


import Link from "next/link";
import { APIMusicData } from "@/types/music";
import { Section } from "./section";
import { Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

export async function MusicsList({
  musicsPromise,
}: {
  musicsPromise?: Promise<APIMusicData[]>;
}) {
  const MusicCard = ({ music }: { music: APIMusicData }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    return (
      <li key={music.id} className="p-2 rounded-lg hover:bg-zinc-800">
        <Link href={`/music/${music.id}`} className="flex gap-3 items-center">
          <img
            src={music.album.cover_medium}
            alt={`capa da música ${music.title}`}
            className="rounded-lg h-20 w-auto"
          />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{music.title}</h3>
              <button
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
            <p className="text-zinc-200">{music.artist.name}</p>
            <audio ref={audioRef} src={music.preview} />
          </div>
        </Link>
      </li>
    );
  };

  if (!musicsPromise) return;

  const musics = await musicsPromise;

  if (musics.length == 0)
    return (
      <Section className="w-full text-center">
        Nenhuma música encontrada.
      </Section>
    );

  return (
    <Section className="w-full">
      <ul className="flex flex-col gap-2">
        <h2 className="text-center font-semibold text-lg text-zinc-200 mb-2">
          Músicas encontradas
        </h2>
        {musics.map((music) => (
          <MusicCard music={music} />
        ))}
      </ul>
    </Section>
  );
}

