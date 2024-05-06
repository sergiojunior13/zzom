import React, { useEffect, useState } from 'react';
import { Card } from './card';
import { APIMusicData } from '@/types/music';
import { fetchTopTracks } from '@/services/rank-api';



export function CardArea() {
    const [topTracks, setTopTracks] = useState<APIMusicData[]>([]);

    useEffect(() => {
        const getTopTracks = async () => {
            const tracks = await fetchTopTracks();
            setTopTracks(tracks);
        };

        getTopTracks();
    }, []);

    return (
        <div className="p-6 bg-transparent items-center ml-8">
            <h2 className="font-semibold text-3xl mt-10 mb-8">Álbuns Populares</h2>
            <div className="flex gap-5 mt-4 mb-4">
                {topTracks.map((track) => (
               <Card
               key={track.id}
               title={track.title}
               artist={track.artist}
               image={`https://e-cdns-images.dzcdn.net/images/artist/${track.md5_image}/500x500-000000-80-0-0.jpg`}
           />
                ))}
            </div>
        </div>
    );
}

