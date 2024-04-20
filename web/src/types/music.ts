export type APIMusicData = {
  id: string;
  langID: number;
  url: string;
  title: string;
  band: string;
};

export type APIFullMusicData = {
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
