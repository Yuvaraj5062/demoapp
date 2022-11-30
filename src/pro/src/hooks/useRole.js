import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { routeData } from "../app/routes/routeData";

const useRole = () => {
  let userRole = localStorage.getItem('role');
  const [role, setRole] = useState(userRole);
  const path = useLocation().pathname;
  const [authRole,setAuthRole] = useState(true);
  useEffect(()=>{
    //   console.log('role called');
    routeData.map((item)=>{
        if(item.location===path){
            if(item.role.includes(role)){
                setAuthRole(true)
            }
            else {
                setAuthRole(false)
            }
        }
        // else {
        //     setAuthRole(false)
        // }
        if(item.children){
            item.children.map((childItem)=>{
                if(childItem.location === path){
                    if(childItem.role.includes(role)){
                        setAuthRole(true)
                    }
                    else{
                        setAuthRole(false)  
                    }
                }
                // else{
                //     setAuthRole(false)
                // }
                return authRole
            })
        }
        return authRole
    })
  },[role,path,authRole])
//   console.log('role>>>',role,'permission>>',authRole,'path>>>',path)
  return {
    setRole,
    role,
    authRole,
    setAuthRole
  };
};
export default useRole;
