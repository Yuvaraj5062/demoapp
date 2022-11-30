import { Navigate, Route, Routes } from "react-router-dom";
// import { LoginModal } from "../../components/modal/login-modal/LoginModal"
// import { Popup } from "../../components/popup/Popup"
// import Home from "../../pages/home/Home"
import Main from "../../pages/main/Main";
import NotFound from "../../pages/notfound/NotFound";
import { routeData } from "./routeData";
import ComingSoon from "../../pages/coming-soon/ComingSoon";
import ContactUs from "../../pages/contact-us/ContactUs";
import { ResetPassword } from "../../pages/reset-password/ResetPassword";

const Root = () => {
  return (
    <Routes>
      <Route path="/notfound" element={<NotFound />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
      <Route
        path="/*"
        element={
          <Main>
            <Routes>
              <Route path="/resetpassword" element={<ResetPassword />} />
              {routeData.map((item, index) => {
                return (
                  <Route
                    path={item.path}
                    element={
                      <item.element>
                        <Routes>
                          {item.children &&
                            item.children.map((childItem, id) => {
                              return (
                                <Route
                                  path={childItem.path}
                                  element={
                                    childItem.redirect ? (
                                      <Navigate to={childItem.redirect} />
                                    ) : (
                                      <childItem.element></childItem.element>
                                    )
                                  }
                                  key={id + 1}
                                ></Route>
                              );
                            })}
                          <Route
                            path="*"
                            element={<Navigate to="/notfound" />}
                          />
                        </Routes>
                      </item.element>
                    }
                    key={index}
                  ></Route>
                );
              })}
              <Route path="*" element={<Navigate to="/notfound" />} />
              {/* <Route path="/contactus" element={<ContactUs />} /> */}
            </Routes>
          </Main>
        }
      ></Route>
    </Routes>
  );
};
export default Root;
