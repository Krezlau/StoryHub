import { useDispatch } from "react-redux";
import { errorActions } from "../store/error-slice";
import { useEffect } from "react";

const useNotification = (
  title: string,
  setTitle: (newState: string) => void,
  error: string,
  setError: (newState: string) => void
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {setError(""); setTitle("");}, 3000);
    if (error !== "") {
      dispatch(
        errorActions.show({ title: title, message: error })
      );
    } else {
      dispatch(errorActions.hide());
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error, dispatch, setError, setTitle, title]);
};

export default useNotification;
