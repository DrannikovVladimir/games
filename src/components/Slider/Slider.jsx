import React from 'react';
import { useSelector } from 'react-redux';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

const Slider = () => {
  const { screenshots } = useSelector((state) => state.games);
  console.log(screenshots);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {screenshots.map(({ id, image }) => (
        <SwiperSlide key={id} style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;