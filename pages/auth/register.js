import classes from "./register/register.module.css";
import Auth from "../auth";
import Link from "next/link";
import Image from "next/image";
import Email from "../../public/images/email.png";
import Lock from "../../public/images/lock.png";
import Logo from "../../public/images/logo.png";
import Avatar from "../../public/images/avatar.png";
import Phone from "../../public/images/phone.png";
import Date from "../../public/images/date.png";
import Gender from "../../public/images/gender.svg";
import { useState } from "react";
import { emailCheck, extractNumber, register } from "../../public/apis";
import { toast } from "react-toastify";
import Input from "../../public/input/input";
import Loader from "../../public/images/authLoader.svg";

const Login = () => {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    DOB: "",
    gender: "Choose Gender",
    phone_number: "",
  });
  const [cpass, setCpass] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      data.name.length < 4 ||
      !emailCheck(data.email) ||
      data.password !== cpass ||
      data.DOB === "" ||
      data.gender === "Choose Gender" ||
      data.phone_number.length < 11
    ) {
      toast.error("Please fill all fields");
    } else {
      try {
        setLoad(true);
        const res = await register(data);
        console.log(res);
        setLoad(false);
      } catch (error) {
        setLoad(false);
        error.response
          ? toast.error(error.response.data.message)
          : toast.error(error.message);
      }
    }
  };
  return (
    <div className={`white ${classes.parent}`}>
      <div className={classes.logo}>
        <Link href="/">
          <div>
            <Image src={Logo} width={50} height={50} alt="Logo" />
          </div>
        </Link>
      </div>
      <div className={classes.container}>
        <Link href="/auth/login">Sign In</Link>
        <p className={classes.welcome}>Welcome!</p>
        <h2 className={classes.bigtext}>
          Create your RCCG Fellowship account here
        </h2>
        <form>
          <div className={classes.form}>
            <Input
              src={Avatar}
              isValid={data.name.length > 3 || data.name.includes(" ")}
              placeholder="Full Name"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              type="text"
              message="Invalid name"
              name="name"
              value={data.name}
            />
            <span className={classes.line}></span>
            <Input
              src={Phone}
              isValid={data.phone_number.length > 10}
              placeholder="Phone Number"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  phone_number: extractNumber(e.target.value),
                }))
              }
              value={data.phone_number}
              type="tel"
              message="Invalid phone number"
              name="phone number"
            />
            <span className={classes.line}></span>
            <Input
              src={Email}
              isValid={emailCheck(data.email)}
              placeholder="Email Address"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              value={data.email}
              type="email"
              message="Invalid email address"
              name="email"
            />
            <span className={classes.line}></span>
            <label>
              <span>
                <Image src={Gender} alt="Email" width={20} height={20} />
              </span>
              <select
                defaultValue={data.gender}
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    gender: e.target.value,
                  }))
                }
              >
                <option value="Choose Gender" disabled>
                  Choose Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <span className={classes.line}></span>
            <Input
              src={Date}
              isValid={data.gender !== ""}
              placeholder="Date of Birth"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  DOB: e.target.value,
                }))
              }
              value={data.DOB}
              type="month"
              message="Invalid date of birth"
              name="date of birth"
            />
            <span className={classes.line}></span>
            <Input
              src={Lock}
              isValid={data.password.length > 5}
              placeholder="Password"
              onChange={(e) =>
                setData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              type="password"
              value={data.password}
              message="Password too short"
              name="new-password"
            />
            <span className={classes.line}></span>
            <Input
              src={Lock}
              isValid={data.password === cpass}
              placeholder="Confirm Password"
              onChange={(e) => setCpass(e.target.value)}
              type="password"
              message="Password don't match"
              name="confirm-password"
              value={cpass}
            />
          </div>
          <Link href="/auth/forgot-password">
            <a className={classes.forgot}>Forgot password?</a>
          </Link>
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

export default Login;

Login.getLayout = function getLayout(page) {
  return <Auth>{page}</Auth>;
};
