import axios from "axios";
import AxiosBase from "./build";

class RequestConfig {
    protected request: any
    constructor(BaseUrl: string) {
        this.request = new AxiosBase(BaseUrl)
        this.interceptor()
    }

    getInstace() {
        return this.request.instance
    }

    private interceptor = () => {
        this.request.instance.interceptors.request.use(
            async (config) => {
                const customHeaders = {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzg3YTBkOTMzZTNmNmQzYWI3ZDQ2ZjZjZjkxZmQzMSIsInN1YiI6IjYxNDczMDk2MmI1MzFkMDAyOTNhY2VmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rdes2zo_cYS-ASUUpHzUg7tUr3E8AOLpsdX4BvSHOJ4`,
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
                config.headers = customHeaders as any
                return config
            },
            (error) => {
                Promise.reject(error)
            }
        )

        this.request.instance.interceptors.response.use(
            (response: any) => {
                // console.log(response)
                return response
            }
        )
    }
}

export default RequestConfig