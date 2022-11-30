import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useRole = () => {
  const { userInfo } = useSelector((state) => state.login); // check role form redux state in future
  let userRole = userInfo?.userDetail?.accessCategory;

  const newAccessControl = userInfo.accessControl ? userInfo.accessControl : [];

  const accessControl = [
    ...newAccessControl,
    "/Logout",
    "/disclaimer",
    "/birthdayreport",
    "/Maintenance Portal/Manage Roles",
  ];
  const [role, setRole] = useState(userRole);
  const path = useLocation().pathname;
  const [authRole, setAuthRole] = useState(true);

  // if child is slected and parent is not in array , below helper
  const modifiedAccessControl = [];
  for (let i = 0; i < 20; i++) {
    if (accessControl[i]) {
      const t = accessControl[i].split("/");
      if (t.length > 2 && modifiedAccessControl.indexOf(`/${t[1]}`) === -1) {
        modifiedAccessControl.push(`/${t[1]}`);
      } else {
        modifiedAccessControl.push(accessControl[i]);
      }
    } else {
      continue;
    }
  }

  useEffect(() => {
    // const isAllowed = accessControl.includes(path.replace(/-/g, " "));
    // const isAllowed = accessControl.find(
    //   (e) => e.toLowerCase() === path.replace(/-/g, " ")
    // );
    const isAllowed = accessControl.find((e) =>
      path.replace(/-/g, " ").includes(e.toLowerCase())
    );
    if (isAllowed) {
      setAuthRole(true);
    } else {
      setAuthRole(false);
    }
  }, [role, path, authRole]);

  // useEffect(() => {
  //   routeData.map((item) => {
  //     if (item.location === path) {
  //       if (item.role.includes(userInfo?.userDetail?.accessCategory)) {
  //         setAuthRole(true);
  //       } else {
  //         setAuthRole(false);
  //       }
  //     }
  //     // else {
  //     //     setAuthRole(false)
  //     // }
  //     if (item.children) {
  //       item.children.map((childItem) => {
  //         if (childItem.location === path) {
  //           if (childItem.role.includes(userInfo?.userDetail?.accessCategory)) {
  //             setAuthRole(true);
  //           } else {
  //             setAuthRole(false);
  //           }
  //         }
  //         // else{
  //         //     setAuthRole(false)
  //         // }
  //         return authRole;
  //       });
  //     }
  //     return authRole;
  //   });
  // }, [role, path, authRole]);

  // console.log("Acess category", userInfo?.userDetail?.accessCategory);

  return {
    setRole,
    role,
    authRole,
    setAuthRole,
  };
};
export default useRole;
