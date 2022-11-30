import {  Route, Routes, useLocation } from "react-router-dom";
import AuthRoutes from "../../component/auth-route/AuthRoute";
import NotFound from "../../component/not-found/NotFound";
import Login from "../../pages/login/Login";
import Main from "../../pages/main/Main";
import { routeData } from "./routeData";

const Root = () => {
    const path = useLocation().pathname;
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/notpermitted' element={<NotFound/>} />
                <Route path="/*" element={
                    <AuthRoutes path={path} >
                        <Main>
                            <Routes>
                                {
                                    routeData.map((item, index) => {
                                            return (
                                                <Route path={item.path} element={
                                                    <item.element p={item.breadcrumb}>
                                                        <Routes>    
                                                            {
                                                                item.children && item.children.map((childItem, id) => {
                                                                    return (
                                                                        <Route path={childItem.path} element={
                                                                            <childItem.element>
                                                                            </childItem.element>
                                                                        } key={id} />
                                                                    )

                                                                })
    
                                                            }
                                                        </Routes>
                                                    </item.element>
                                                } key={index} />
                                            )
                                    })
                                }
                            </Routes>
                        </Main>
                    </AuthRoutes>
                } />
            </Routes>
        </>
    )
}
export default Root;