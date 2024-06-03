import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MovieRequest from "../services/movie";
import styles from "./HomePageStyles.module.css";
import { useQuery } from "@tanstack/react-query";
import { json } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WithScrollbar from "./Withscrollbar";
const service = new MovieRequest();

const getMovies = () => ({
  queryKey: ["UpcomingMovieList"],
  queryFn: async () =>
    service
      .getMovieList()
      .then((res) => {
        return res?.data?.results;
      })
      .catch((err) => {
        throw json({ message: err.message }, { status: err.response.status });
      }),
});

export const loader = (queryClient) => async () => {
  const query = getMovies();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export default () => {
  const { data: movieList } = useQuery(getMovies());

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <h3 className={styles.header}>Upcomings</h3>
        <Carousel
          className={styles.swipper}
          responsive={responsive}
          swipeable={true}
          draggable={true}
        >
          {movieList?.map((item) => (
            <SwiperSlide key={item.id} className={styles.container}>
              <img
                src={`http://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                alt=""
              />
              <p className={styles.movieName}>{item.original_title}</p>
            </SwiperSlide>
          ))}
        </Carousel>
      </main>
    </>
  );
};
