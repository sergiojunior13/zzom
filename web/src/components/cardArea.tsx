import React, { useEffect, useState } from 'react';
import { Card } from './card';
import { APIMusicData } from '@/types/music';
import { fetchTopTracks } from '@/services/rank-api';
import { Navigation, Pagination, Scrollbar, A11y, Keyboard, Mousewheel } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';



export function CardArea() {

    const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      let size = 0;

      if (width < 600) {
        size = 2;
      } else if (width >= 600 && width < 1024) {
        size = 3;
      }  else if (width >= 1024 && width < 1500){
        size = 4;
      }else {
        size = 5;
      }

      setScreenSize(size);
    }

    handleResize(); // Chama a função para definir o tamanho inicial
    window.addEventListener('resize', handleResize);

    // Remove o event listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Apenas executa uma vez no montar do componente




    const [topTracks, setTopTracks] = useState<APIMusicData[]>([]);

    useEffect(() => {
        const getTopTracks = async () => {
            const tracks = await fetchTopTracks();
            setTopTracks(tracks);
        };

        getTopTracks();
    }, []);

    return (
    <div className="p-6 pt-4 pr-0 bg-transparent items-center mb-4 ml-2">
        <h2 className="font-semibold text-3xl mt-10 mb-2">Álbuns Populares</h2>
        <div className="flex gap-5 mt-2 overflow-x-auto">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard, Mousewheel]}
                spaceBetween={150}
                slidesPerView={screenSize}
                keyboard
                mousewheel
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className="w-full"
            >
                {topTracks.map((track) => (
                    <SwiperSlide>
                        <Card
                            key={track.id}
                            title={track.title}
                            artist={track.artist}
                            image={`https://e-cdns-images.dzcdn.net/images/artist/${track.md5_image}/500x500-000000-80-0-0.jpg`}
                        />
                    </SwiperSlide>
                    
                ))} <SwiperSlide>{/*so pra teste*/}</SwiperSlide>
                
            </Swiper>
        </div>
    </div>
);

}
