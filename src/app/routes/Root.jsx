import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuthRoutes from "../../component/auth-route/AuthRoute";
import Modal from "../../component/modal/Modal";
import NotFound from "../../component/not-found/NotFound";
import Popup from "../../component/popup/Popup";
import ForgotPassword from "../../pages/forgot-password/ForgotPassword";
import DisclaimerPopup from "../../pages/login/disclaimer-popup/DisclaimerPopup";
import Login from "../../pages/login/Login";
import Main from "../../pages/main/Main";
import ResetPassword from "../../pages/reset-password/ResetPassword";
import { routeData } from "./routeData";

const Root = () => {
  const path = useLocation().pathname;
  /* IT WILL GLOBALLY REMOVE CONSOLE LOGS, If doing development below line */
  console.log = () => {};

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/disclaimer"
          element={
            <AuthRoutes>
              <Popup
                Children={DisclaimerPopup}
                handleClose={() => <Navigate to="/birthdayreport" />}
              />
            </AuthRoutes>
          }
        />
        <Route
          path="/birthdayreport"
          element={
            <AuthRoutes>
              <Popup
                Children={Modal}
                handleClose={() => <Navigate to="/dashboard" />}
              />
            </AuthRoutes>
          }
        />
        <Route path="/notpermitted" element={<NotFound />} />
        <Route
          path="/*"
          element={
            <AuthRoutes path={path}>
              <Main>
                <Routes>
                  {routeData.map((item, index) => {
                    return (
                      <Route
                        path={item.path}
                        element={
                          <item.element p={item.breadcrumb}>
                            <Routes>
                              {item.children &&
                                item.children.map((childItem, id) => {
                                  return (
                                    <Route
                                      path={childItem.path}
                                      element={
                                        <childItem.element>
                                          <Routes>
                                            {childItem.children &&
                                              childItem.children.map(
                                                (subChildItem, i) => {
                                                  return (
                                                    <Route
                                                      path={subChildItem.path}
                                                      element={
                                                        <subChildItem.element></subChildItem.element>
                                                      }
                                                      key={i}
                                                    />
                                                  );
                                                }
                                              )}
                                          </Routes>
                                        </childItem.element>
                                      }
                                      key={id}
                                    />
                                  );
                                })}
                              {item.children && (
                                <Route
                                  path="*"
                                  element={
                                    <Navigate
                                      to={item.children[0].path}
                                      replace
                                    />
                                  }
                                ></Route>
                              )}
                            </Routes>
                          </item.element>
                        }
                        key={index}
                      />
                    );
                  })}
                  <Route path="*" element={<Navigate to="/" replace />}></Route>
                </Routes>
              </Main>
            </AuthRoutes>
          }
        />
      </Routes>
    </>
  );
};
export default Root;
