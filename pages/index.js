import Image from "next/image";
import classes from "./index.module.css";
import People from "../public/images/people.svg";
import { useMemo, useEffect, useState } from "react";
import { autoLogout, clockIn, getTime } from "../public/apis";
import { toast } from "react-toastify";
import Loader from "../public/images/loader.svg";
import { useContext } from "react";
import { AppContext } from "../public/context";
import { useRouter } from "next/router";
import Logo from "../public/logo.png";

const Home = () => {
  let router = useRouter();
  let { info } = useContext(AppContext);
  const [time, setTime] = useState(undefined);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (!autoLogout(token)) {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
    const fetchTime = async () => {
      try {
        const res = await getTime();
        setTime(res.data.currentDateTime);
      } catch (error) {
        console.log(error);
        if (error.response) toast.error(error.response.data.message);
        else toast.error(error.message);
      }
    };
    fetchTime();
  }, []);

  const today = useMemo(() => {
    const date = new Date(time);
    return date.toLocaleString("en-us", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
  }, [time]);

  const attendance = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const data = {
        clockIn: time,
      };
      await clockIn(data);
      router.push("/response");
      setLoad(false);
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
      setLoad(false);
    }
  };
  return (
    <div>
      <main className={classes.main}>
        <div>
          <div className={`white ${classes.card}`}>
            <h2>Welcome to church</h2>
            <p>RCCG Seed of Excellence (Raising Excellent Minds)</p>
            <div className={classes.logo}>
              <Image src={Logo} width={180} height={150} alt="logo" />
            </div>
            <div className={classes.img}>
              <Image src={People} width={150} height={150} alt="People" />
            </div>
          </div>
          <div className={`center ${classes.time}`}>
            {!!info.user && <h2>Dear {info.user.name.toUpperCase()}</h2>}
            {!time && <Image src={Loader} alt="loading..." />}
            {time && (
              <>
                <h2>Today: {today}</h2>
                <p>Confirm attendance below</p>
              </>
            )}
          </div>
          <div className={`center-flex ${classes.btn}`}>
            {!load && (
              <button className={`white `} onClick={attendance}>
                Clock in
              </button>
            )}
            {!!load && <Image src={Loader} alt="loading..." />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
