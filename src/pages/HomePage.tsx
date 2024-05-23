import RequestConfig from "../https/config";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
const HomePage = () => {
  const service = new RequestConfig(
    "https://api.themoviedb.org/3/movie/upcoming"
  ).getInstace();

  service.get();
  return (
    <h1>
      {" "}
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper>
    </h1>
  );
};

export default HomePage;
