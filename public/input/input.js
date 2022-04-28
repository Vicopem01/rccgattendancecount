import classes from "./input.module.css";
import { useState } from "react";
import Image from "next/image";

const Input = ({
  src,
  isValid,
  placeholder,
  onChange,
  type,
  name,
  message,
  value,
}) => {
  const [error, setError] = useState(false);
  const handleBlur = () => {
    if (!!isValid) setError(false);
    else setError(true);
  };
  return (
    <>
      <label className={classes.label}>
        <Image src={src} width={12} height={15} alt={name} />
        <input
          className={`${error ? classes.error : ""}`}
          type={type}
          placeholder={placeholder}
          onBlur={handleBlur}
          onFocus={() => setError(false)}
          onChange={onChange}
          autoComplete={name}
          value={value}
          name={name}
        />
      </label>
      {error && <span className={classes.red}>{message}</span>}
    </>
  );
};

export default Input;
