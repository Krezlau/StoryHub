import { useDispatch } from "react-redux";
import { errorActions } from "../store/error-slice";
import { useEffect } from "react";

const useNotification = (error: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error !== "") {
      dispatch(
        errorActions.show({ title: "Something went wrong.", message: error })
      );
    } else {
      dispatch(errorActions.hide());
    }
  }, [error]);
};

export default useNotification;
