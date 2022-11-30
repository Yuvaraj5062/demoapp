import { useEffect, useRef, useState } from "react";
import styles from "./main.module.scss";
import Header from "../../components/header/Header";
import MobileMenuBar from "../../components/modal/mobile-menu-bar/MobileMenuBar";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen ";
import Footer from "../../components/footer/Footer";
import { executeScroll } from "../../helpers/utils";

const Main = ({ children }) => {
  const [open, setOpen] = useState(false);
  const isMobile = useCheckMobileScreen();
  const scrollRef = useRef();
  useEffect(() => {
    // 👇️ scroll to top on page load
    // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    executeScroll(scrollRef)
  }, []);
  return (
    <div className={styles.mainContainer} ref={scrollRef}>
      <Header open={open} setOpen={setOpen} />
      {/* <Navbar /> */}
      {children}
      {isMobile && open && <MobileMenuBar open={open} setOpen={setOpen} />}
      <Footer scrollRef={scrollRef}/>
    </div>
  );
};

export default Main;
