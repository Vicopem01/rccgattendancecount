import classes from "./auth/auth.module.css";

const Auth = ({ children }) => {
  return (
    <main className={classes.main}>
      {children}
    </main>
  );
};

export default Auth;
