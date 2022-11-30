import { useState } from "react";

const useToken = () => {
  let jwtToken = localStorage.getItem('token');
   const [token, setToken] = useState(jwtToken);
  return {  
  setToken,
  token
  };
};
export default useToken;
