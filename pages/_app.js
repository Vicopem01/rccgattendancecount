import "../styles/globals.css";
import { ToastContainer, Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useState, useEffect } from "react";
import { AppContext } from "../public/context";
import { getUserProfile } from "../public/apis";

const MyApp = ({ Component, pageProps }) => {
  const [info, setInfo] = useState({
    isAuthenticated: false,
    user: null,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUser = async () => {
      try {
        const res = await getUserProfile(token);
        console.log(res.data.checkUser);
        setInfo((prevState) => ({
          ...prevState,
          user: res.data.checkUser,
          isAuthenticated: true,
        }));
      } catch (error) {
        router.push("/auth/login");
        error.response
          ? toast.error(error.response.data.message)
          : toast.error(error.message);
      }
    };
    getUser();
  }, []);
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AppContext.Provider value={{ info, setInfo }}>
      <Head>
        <title>RCCG Seed Of Joy</title>
      </Head>
      <ToastContainer
        autoClose={2500}
        position="top-center"
        closeOnClick={true}
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        transition={Flip}
      />
      <Component {...pageProps} />
    </AppContext.Provider>
  );
};

export default MyApp;
