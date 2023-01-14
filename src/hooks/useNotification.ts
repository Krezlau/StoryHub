import { useDispatch } from "react-redux";
import { errorActions } from "../store/error-slice";
import { useEffect } from "react";

const useNotification = (
  error: string,
  setError: (newState: string) => void
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {setError("")}, 3000);
    if (error !== "") {
      dispatch(
        errorActions.show({ title: "Something went wrong.", message: error })
      );
    } else {
      dispatch(errorActions.hide());
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error, dispatch, setError]);
};

export default useNotification;
