import { useParams } from "react-router-dom";
import MovieRequest from "../services/movie";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import styles from "./MovieDetail.module.css";
const services = new MovieRequest();
import testImage from "../assets/test.jpg";
const MovieDetail = () => {
  let { id } = useParams();
  console.log(id, "--------");

  const {
    data: moveDetail,
    isLoading: moveDetailIsLoading,
    error: moveDetailError,
    refetch: moveDetailRefetch,
  } = useQuery({
    queryKey: ["popMovie"],
    queryFn: () =>
      services.getMovieDetail(id).then((res) => {
        console.log(res?.data);
        return res?.data;
      }),
  });

  return (
    <div className={styles.container}>
      {!moveDetailIsLoading && (
        <div className={styles.movieDetailCard}>
          <div className={styles.imageStyle}>
            <img className={styles.image} src={testImage} alt="movie poster" />
          </div>
          <div className={styles.detailCon}>
            <div className={styles.conName}>
              <h3 className={styles.title}> {moveDetail?.original_title} </h3>
              <h4 className={styles.tagline}> {moveDetail?.tagline} </h4>
            </div>
            <div className={styles.genres}>
              {moveDetail?.genres.map((item) => (
                <h5 key={item.id}>{item.name}</h5>
              ))}
            </div>
            <div className={styles.extraCon}>
              <h5 className={styles.runtime}>
                time
                <span>{moveDetail?.runtime} min</span>
              </h5>
              <h5 className={styles.vote_average}>
                rating <span>{moveDetail?.vote_average} </span>
              </h5>
            </div>
            <h3> {moveDetail?.overview}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
