import axios from "axios";
import jwt from "jsonwebtoken";
import { baseUrl } from "../base";

export const login = async (data) => {
  const response = await axios({
    method: "POST",
    url: `${baseUrl}/login`,
    data: data,
  });
  return response;
};

export const register = async (data) => {
  const response = await axios({
    method: "POST",
    url: `${baseUrl}/register`,
    data: data,
  });
  return response;
};

export const getTime = async () => {
  const response = await axios({
    method: "GET",
    url: "https://world-clock.p.rapidapi.com/json/gmt/now",
    headers: {
      "X-RapidAPI-Host": "world-clock.p.rapidapi.com",
      "X-RapidAPI-Key": "d4c5275e66mshb58d7697aced20ap17911ajsn80fef75561e1",
    },
  });
  return response;
};
export const getUserProfile = async (token) => {
  const response = await axios({
    method: "GET",
    url: `${baseUrl}/user/profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const autoLogout = (token) => {
  if (!token) return false;
  else {
    const data = jwt.decode(token);
    if (!data) return false;
    const newDate = new Date(data.exp) * 1000;
    if (newDate < new Date().getTime()) return false;
    else {
      const newTime = newDate - new Date().getTime();
      return {
        newTime,
        data,
      };
    }
  }
};

export const clockIn = (data) => {
  const response = axios({
    method: "POST",
    url: `${baseUrl}/clockin`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  });
  return response;
};

export const extractNumber = (n) => {
  return n.replace(/[^0-9]/g, "");
};

export const emailCheck = (value) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(value);
};
