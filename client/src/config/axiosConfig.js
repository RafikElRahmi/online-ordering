import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://online-ordering-psi.vercel.app/",
    headers: {
        credentials: true,
    },
});
export default axiosInstance