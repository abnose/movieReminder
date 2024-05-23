import axios, { AxiosInstance } from "axios";

class AxiosBase {
    protected instance: AxiosInstance
    constructor(baseUrl: string) {
        this.instance = axios.create({
            baseURL: baseUrl,
        });
    }
}

export default AxiosBase