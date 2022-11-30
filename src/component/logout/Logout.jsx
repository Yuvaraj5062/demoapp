import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToDefault } from "../../redux/features/login/loginSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToDefault());
    localStorage.clear();
    navigate("/");
  }, []);

  /* 

  make an api call to server to delete a tokens
  */

  return <div></div>;
};

export default Logout;
