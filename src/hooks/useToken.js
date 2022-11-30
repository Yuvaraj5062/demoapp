import { useState } from "react";
import { useSelector } from "react-redux";

const useToken = () => {
  const { userInfo } = useSelector((state) => state.login);
  // let jwtToken = localStorage.getItem("token");
  const [token, setToken] = useState(userInfo?.token);

  return {
    setToken,
    token,
  };
};
export default useToken;
