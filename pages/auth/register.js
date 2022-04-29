import classes from "./register/register.module.css";
import Auth from "../auth";
import Link from "next/link";
import Image from "next/image";
import Email from "../../public/images/email.png";
import Lock from "../../public/images/lock.png";
import Avatar from "../../public/images/avatar.png";
import Phone from "../../public/images/phone.png";
import Date from "../../public/images/date.png";
import Gender from "../../public/images/gender.svg";
import { useState } from "react";
import { emailCheck, extractNumber, register } from "../../public/apis";
import { toast } from "react-toastify";
import Input from "../../public/input/input";
import Loader from "../../public/images/authLoader.svg";
import { useRouter } from "next/router";
import Logo from "../../public/logo.png";

const Register = () => {
  let router = useRouter();
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
        localStorage.setItem("token", res.data.token);
        router.push("/");
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
      <div className={classes.container}>
        <Link href="/">
          <div className="center-flex">
            <Image src={Logo} alt="Logo" width={120} height={100} />
          </div>
        </Link>
        <h2 className={classes.bigtext}>
          Create your RCCG Seed of Excellence account here
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
              type="date"
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
          <div className={classes.links}>
            <Link href="/auth/login">Sign In</Link>
            <Link href="/auth/forgot-password">Forgot password?</Link>
          </div>
          {load && (
            <div className="center-flex">
              <Image src={Loader} alt="loading..." />
            </div>
          )}
          {!load && (
            <button className={classes.btn} onClick={handleSubmit}>
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;

Register.getLayout = function getLayout(page) {
  return <Auth>{page}</Auth>;
};
