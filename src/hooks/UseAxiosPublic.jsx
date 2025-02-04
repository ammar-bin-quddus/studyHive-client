import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://study-hive-server-site.vercel.app",
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
