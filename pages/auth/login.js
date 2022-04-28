import classes from "./login/login.module.css";
import Auth from "../auth";
import Link from "next/link";
import Image from "next/image";
import Email from "../../public/images/email.png";
import Lock from "../../public/images/lock.png";
import { useState } from "react";
import { login } from "../../public/apis";
import { toast } from "react-toastify";
import Loader from "../../public/images/authLoader.svg";
import { useRouter } from "next/router";
import { AppContext } from "../../public/context";
import { useContext } from "react";

const Login = () => {
  let { setInfo } = useContext(AppContext);
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await login(data);
      localStorage.setItem("token", res.data.token);
      setLoad(false);
      setInfo((prevState) => ({
        ...prevState,
        isAuthenticated: true,
      }));
      router.push("/");
    } catch (error) {
      error.response
        ? toast.error(error.response.data.message)
        : toast.error(error.message);
      setLoad(false);
    }
  };

  return (
    <div className={`white ${classes.parent}`}>
      <div className={classes.container}>
        <h2 className={classes.bigtext}>
          Sign in to your RCCG Seed of Joy account
        </h2>
        <form>
          <div className={classes.form}>
            <label>
              <span>
                <Image src={Email} alt="Email" width={20} height={20} />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={data.email}
                autoComplete="email address"
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </label>
            <span className={classes.line}></span>
            <label>
              <span>
                <Image src={Lock} alt="Password" width={16} height={20} />
              </span>
              <input
                type="password"
                placeholder="Password"
                value={data.password}
                autoComplete="password"
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </label>
          </div>
          <div className={classes.links}>
            <Link href="/auth/register"> Create account</Link>
            <Link href="/auth/forgot-password">
              {/* <a className={classes.forgot}> */}
              Forgot password?
              {/* </a> */}
            </Link>
          </div>
          {load && (
            <div className="center-flex">
              <Image src={Loader} alt="loading..." />
            </div>
          )}
          {!load && (
            <button className={classes.btn} onClick={handleSubmit}>
              Sign In
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

Login.getLayout = (page) => {
  return <Auth>{page}</Auth>;
};
export default Login;
