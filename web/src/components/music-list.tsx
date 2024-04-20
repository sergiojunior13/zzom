import { APIMusicData } from "@/types/music";
import Link from "next/link";
import { Section } from "./section";

export async function MusicsList({ musicsPromise }: { musicsPromise?: Promise<APIMusicData[]> }) {
  const MusicCard = ({ music }: { music: APIMusicData }) => (
    <li key={music.id} className="p-4 rounded-lg hover:bg-zinc-800">
      <Link href={`/music/${music.id}`}>
        <h3 className="font-bold text-lg">{music.title}</h3>
        <p className="text-zinc-200">{music.band}</p>
      </Link>
    </li>
  );

  if (!musicsPromise) return;

  const musics = await musicsPromise;

  if (musics.length == 0)
    return <Section className="w-full text-center">Nenhuma música encontrada.</Section>;

  return (
    <Section className="w-full">
      <ul>
        <h2 className="text-center font-semibold text-lg text-zinc-200 mb-2">
          Músicas encontradas
        </h2>
        {musics.map(music => (
          <MusicCard music={music} />
        ))}
      </ul>
    </Section>
  );
}
