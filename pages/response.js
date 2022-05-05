import classes from "./response/response.module.css";
import { AppContext } from "../public/context";
import { useContext } from "react";

const Reponse = () => {
  let { info } = useContext(AppContext);
  return (
    <main className={classes.main}>
      <div className={classes.sub}>
        <p>Beloved,</p>
        <br />
        <p>{!!info.isAuthenticated && ` ${info.user.name.toUpperCase()}, `}</p>
        <br />
        Thank you for coming
        <br />
        <h2>Our services are as follows:</h2>
        <ul>
        
          <li>
            <div className={classes.icon1}>
              <p>8am</p>
            </div>
            <h3>Sunday Service</h3>
          </li>
          <li>
            <div className={classes.icon2}>
              <p>6pm</p>
            </div>
            <h3>Wednesday Service</h3>
          </li>
          <li>
            <div className={classes.icon3}>
              <p>10pm</p>
            </div>
            <h3>Last day of the month, crossover service</h3>
          </li>
        </ul>
        <p>No Church without you</p>
      </div>
    </main>
  );
};

export default Reponse;
