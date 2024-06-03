import { useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";
const ErrorPage = () => {
  const error = useRouteError();

  //   console.log("error", error);

  return (
    <>
      <h1 className={classes.h1}>Some Thing Bad Happend</h1>
      <p className={classes.p}>{error?.data?.message}</p>
    </>
  );
};

export default ErrorPage;
