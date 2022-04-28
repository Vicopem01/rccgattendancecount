import classes from "./response/response.module.css";
import { AppContext } from "../public/context";
import { useContext } from "react";

const Reponse = () => {
  let { info } = useContext(AppContext);
  return (
    <main className={classes.main}>
      <div className={classes.sub}>
        <p>
          Beloved
          {!!info.isAuthenticated && ` ${info.user.name.toUpperCase()}, `}
          <br />
          attendance has been saved, thank you for coming
        </p>
      </div>
    </main>
  );
};

export default Reponse;
