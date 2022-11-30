import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { popup } from "../../redux/popup/popupSlice";
import Home from "../home/Home";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(popup("ResetPassScreen"));
  });

  return (
    <>
      <Home />
    </>
  );
};
