import { AxiosInstance } from "axios";
import RequestConfig from "../https/config";

class MovieRequest {
  api: AxiosInstance
  constructor() {
    this.api = new RequestConfig(
      "https://api.themoviedb.org/3/movie/upcoming"
    ).getInstace();
  }

  public getMovieList() {
    return this.api.get('').then((response) => {
      // console.log(response, '+++++++++')
      return response;
    });
  }
}

export default MovieRequest;
