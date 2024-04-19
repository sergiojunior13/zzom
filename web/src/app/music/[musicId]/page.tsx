import axios from "axios";

type APIMusic = {
  type: string;
  art: {
    id: string;
    name: string;
    url: string;
  };
  mus: [
    {
      id: string;
      name: string;
      url: string;
      lang: number;
      text: string;
    }
  ];
  badwords: boolean;
};

type MusicInfosProps = {
  params: { musicId: string };
};

export default async function MusicInfos({ params }: MusicInfosProps) {
  const musicId = params.musicId;

  const musicInfo = await axios
    .get(`https://api.vagalume.com.br/search.php?musid=${musicId}`)
    .then((res) => res.data as APIMusic);

  const music = musicInfo.mus[0];
  const musicTitle = music.name;
  const musicArtist = musicInfo.art.name;

  return (
    <main>
      <h1 className="font-bold">{musicTitle}</h1>
      <h2 className="font-medium">{musicArtist}</h2>
      <span>{musicInfo.badwords && "Contém palavrões"}</span>
      <p className="whitespace-break-spaces">{musicInfo.mus[0].text}</p>
    </main>
  );
}
