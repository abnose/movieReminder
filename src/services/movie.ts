import { AxiosInstance } from "axios";
import RequestConfig from "../https/config";

class MovieRequest {
  api: AxiosInstance
  constructor() {
    this.api = new RequestConfig(
      "https://api.themoviedb.org/3/movie"
    ).getInstace();
  }

  public getMovieList() {
    return this.api.get('/upcoming').then((response) => {
      return response;
    });
  }
  public getNowPlayingMovieList() {
    return this.api.get('/now_playing?language=en-US&page=1').then((response) => {
      return response;
    });
  }
  public getPopMovieList() {
    return this.api.get('/popular?language=en-US&page=1').then((response) => {
      return response;
    });
  }
}

export default MovieRequest;
