import MovieRequest from "../services/movie";
import styles from "./HomePageStyles.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { json } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
const service = new MovieRequest();
import Swiper from "../components/Swiper";
import { useEffect, useState } from "react";

export default () => {
  const [faveList, setFaveList] = useState();

  useEffect(() => {
    setFaveList(JSON.parse(localStorage.getItem("favList")!) || []);
  }, []);

  const updateHandler = (data) => {
    setFaveList(data);
  };

  const {
    data: upcomingMovieList,
    isLoading: upcomingMovieListIsLoading,
    error: upcomingMovieListError,
    refetch: upcomingMovieListRefetch,
  } = useQuery({
    queryKey: ["upcomingMovie"],
    queryFn: () =>
      service.getMovieList().then((res) => {
        return res?.data.results;
      }),
  });

  const {
    data: popMovieList,
    isLoading: popMovieListIsLoading,
    error: popMovieListError,
    refetch: popMovieListRefetch,
  } = useQuery({
    queryKey: ["popMovie"],
    queryFn: () =>
      service.getPopMovieList().then((res) => {
        return res?.data.results;
      }),
  });

  const {
    data: nowPlayList,
    isLoading: nowPlayListIsLoading,
    error: nowPlayListError,
    refetch: nowPlayListRefetch,
  } = useQuery({
    queryKey: ["nowPlay"],
    queryFn: () =>
      service.getNowPlayingMovieList().then((res) => {
        return res?.data.results;
      }),
  });

  console.log("rerenderd");

  return (
    <>
      <main className={styles.mainContainer}>
        {faveList?.length ? (
          <Swiper
            handleFavList={updateHandler}
            data={faveList}
            header={"Waitng For"}
          />
        ) : (
          <></>
        )}
        {!upcomingMovieListIsLoading && (
          <Swiper
            handleFavList={updateHandler}
            data={upcomingMovieList}
            header={"Upcoming Movies"}
          />
        )}
        {!popMovieListIsLoading && (
          <Swiper
            handleFavList={updateHandler}
            data={popMovieList}
            header={"Popular Movies"}
          />
        )}
        {!nowPlayListIsLoading && (
          <Swiper
            handleFavList={updateHandler}
            data={nowPlayList}
            header={"Now Playing Movies"}
          />
        )}
      </main>
    </>
  );
};
