export type SearchMusicFromLyricsAPIResponse = {
  response: {
    docs: [
      {
        id: string;
        langID: number;
        url: string;
        title: string;
        band: string;
      }
    ];
  };
};
