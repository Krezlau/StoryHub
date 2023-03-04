import {useEffect} from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../store";
import {useNavigate} from "react-router-dom";

const useLoginRedirect = (error: string, isLoading: boolean) => {
  const goBack = useSelector((state: IRootState) => state.redirect.goBack);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      if (goBack) {
        navigate(-1);
        return;
      }
      navigate("/home");
    }
    if (!isLoading && error !== "") {
      console.log(error);
      return;
    }
  }, [error, goBack, isLoading, isLoggedIn, navigate]);
};

export default useLoginRedirect;
