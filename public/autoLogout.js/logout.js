import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect } from "react";
const autoLogout = (token) => {
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

const AutoLogout = ({ children }) => {
  let route = useRouter();
  useEffect(() => {
    if (!autoLogout(localStorage.getItem("token"))) return route.push("/");
  }, []);
  return <>{children}</>;
};

export default AutoLogout;
