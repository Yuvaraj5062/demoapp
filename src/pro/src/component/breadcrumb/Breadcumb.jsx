import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { routeData } from "../../app/routes/routeData";
import styles from './breadcrumb.module.scss'
const Breadcrumb = ({ data }) => {
    const navigate = useNavigate();
    let location = useLocation();
    const path = useLocation().pathname;
    const [state, setState] = useState([]);

    // console.log("location",location)
    useEffect(() => {
        for (let i = 0; i < routeData.length; i++) {
            if (routeData[i].breadcrumb && routeData[i].location === path) {
                // console.log('breadcrumb>>',routeData[i].breadcrumb)
                setState(routeData[i].breadcrumb);
                return routeData[i].breadcrumb
            }
            else if (routeData[i].children) {
                for (let j = 0; j < routeData[i].children.length; j++) {
                    if (routeData[i].children[j].location === path) {
                        // console.log('breadcrumb2>>', routeData[i].children[j].breadcrumb)

                        setState(routeData[i].children[j].breadcrumb);
                        return routeData[i].children[j].breadcrumb;
                        // break;
                    }
                    else {

                        if (!isNaN(path.split('/')[2])) {
                            if (routeData[i].children[j].breadcrumb && path.split("/").length < 4) {
                                if (routeData[i].children[j].breadcrumb[0].label.split('/')[0].toLowerCase() === path.split("/")[1].toLowerCase())
                                    if (location.state && location.state.name) {
                                        localStorage.setItem("name", location.state && location.state.name)
                                        localStorage.setItem("id", location.state && location.state.id)
                                    }
                                setState([{ label: `${path.split("/")[1]}/`, navigation: '' }, { label: location.state ? location.state.name : localStorage.getItem("name"), navigation: location.state ? location.state.id : localStorage.getItem("id") }])
                                break;
                            } else {
                                path.split("/")[3] ?
                                    setState([{ label: `${path.split("/")[1]}/`, navigation: '' }, { label: `${location.state ? location.state.name : localStorage.getItem("name")}/`, navigation: location.state ? location.state.id : localStorage.getItem("id") }, { label: `${path.split("/")[3] ? `${path.split("/")[3]}/` : ''}`, navigation: '' }])
                                    :
                                    setState([{ label: `${path.split("/")[1]}/`, navigation: '' }, { label: `${location.state ? location.state.name : localStorage.getItem("name")}/`, navigation: location.state ? location.state.id : localStorage.getItem("id") }])

                            }
                        }
                        else
                            setState(null)
                    }
                }
            }
        }
    }, [path])
    // useEffect(()=>{},[state])

    return (
        <div className={state && styles.breadcrumbContainer}>
            {
                state && state.map((item, index) => {
                    return (
                        <span key={index} onClick={() =>
                            navigate(`${item.navigation}`)}
                            className={
                                index === state.length - 1
                                    ? styles.navlinkTextBlue
                                    : styles.navlinkText
                            }>{item.label}</span>
                    )
                })
            }
        </div>
    )
}
export default Breadcrumb;