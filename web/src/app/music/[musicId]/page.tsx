import Link from "next/link";
import { PiCaretLeft } from "react-icons/pi";
import colors from "tailwindcss/colors";
import { Section } from "@/components/section";
import { MusicAPI } from "@/services/music-api";
import { AddToPlaylistButton } from "@/components/add-to-playlist-button";

type FullMusicDataProps = {
  params: { musicId: string };
};

export default async function FullMusicData({ params }: FullMusicDataProps) {
  const { musicId } = params;

  const { music, artist, musicContainsBadWords } = await MusicAPI.getFullMusicData(musicId);

  return (
    <Section className="my-14 max-w-3xl w-full m-auto px-8">
      <Link href="/" className="text-indigo-700 flex gap-1 items-center">
        <PiCaretLeft color={colors.indigo[700]} size={20} /> Voltar
      </Link>
      <div className="mb-8 flex justify-between items-start">
        <div className="mt-2">
          {musicContainsBadWords && (
            <span className="bg-red-600 p-0.5 px-2 rounded-lg font-medium mb-1">
              Contém palavrões
            </span>
          )}
          <h1 className="font-bold text-2xl">{music.name}</h1>
          <span className="font-semibold text-indigo-500 text-xl">{artist.name}</span>
        </div>

        <AddToPlaylistButton music={{ id: music.id, band: artist.name, title: music.name }} />
      </div>

      <p className="whitespace-break-spaces text-zinc-200">{music.text}</p>
    </Section>
  );
}
