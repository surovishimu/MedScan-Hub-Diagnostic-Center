import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://b8a12-server-side-surovishimu.vercel.app/'
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;