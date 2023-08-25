import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3010',
});

export const getSity = async () => {
    const response = await instance.get(`/api/city`);
    return response;
  };