import React, {useState, useRef, useEffect, Fragment} from "react";
import avatar_icon from "../images/profileDefault.svg"
import logo from "../images/LogoF.svg"
import NavbarDropdown from "./NavbarDropdown";
import classnames from "classnames";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NotificationDropdown from "./NotificationDropdown";
import {bindActionCreators} from "redux";
import {notificationActions} from "../state";

const Navbar = ({setAuth}) => {
    const [search, setSearch] = useState("")
    const [searchVisibility, setSearchVisibility] = useState(true)
    const location = useLocation();
    const history = useHistory();
    const [dropdown, toggleDropdown] = useState(false)
    const [hasNotifications, setHasNotifications] = useState(false)
    const ref = useRef(null);
    const ref2 = useRef(null)
    const [notificationDropdown, toggleNotificationDropdown] = useState(false)

    const notificationState = useSelector((state) => state.notificationState)

    const {getUserNotifications} = bindActionCreators(notificationActions, useDispatch())

    const handleToggleClick = () => {
        toggleDropdown(!dropdown)
    }

    const handleNotificationToggleClick = () => {
        toggleNotificationDropdown(!notificationDropdown)
    }

    const handleClickOutside = e => {
        if ((ref.current && !ref.current.contains(e.target)) && (ref2.current && !ref2.current.contains(e.target))) {
            toggleDropdown(false);
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem("token");
            setAuth(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            history.push({
                pathname: '/dashboard/trazi',
                search: search
            });
        }
    }

    useEffect(() => {
        if(location.pathname === "/dashboard/trazi"){
            setSearchVisibility(false)
        }else{
            setSearch("")
            setSearchVisibility(true)
        }
    }, [location]);


    const userState = useSelector((state) => state.userState)

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside,true );
        }
    });

    useEffect( () => {
        getUserNotifications().then(r => {
            if(r){
                let a = r.filter(n => !n.clear_notification)
                if(a.length){
                    setHasNotifications(true)
                }else{
                    setHasNotifications(false)
                }
            }
        })
    }, []);

    return (
        <div className="navbar-container">
            <div className="logo-container">
                <Link to="/dashboard/stvari">
                    <img src={logo} alt="Avatar"/>
                </Link>
            </div>
            <div className="search-container">
                <div className="inner-container">
                    {searchVisibility &&
                        <Fragment>
                            <i className="fi-br-search"/>
                            <input
                                type="text"
                                placeholder="Pretraži..."
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                onKeyPress={event => handleSubmit(event)}
                            />
                        </Fragment>
                    }
                </div>
            </div>
            <div className="navbar-menu-container">
                <i className="fi-br-bell bell" onClick={handleNotificationToggleClick}>
                    {hasNotifications &&
                    <div className="bell-has-content"/>
                    }
                </i>
                {notificationDropdown &&
                <NotificationDropdown notificationDropdown={notificationDropdown} hasNotifications={hasNotifications} handleNotificationToggleClick={handleNotificationToggleClick}/>
                }
                <img className="avatar" src={userState.currentUser.user_image ? userState.currentUser.user_image : avatar_icon} alt="Avatar"/>
                <div ref={ref2} className="name-container" onClick={handleToggleClick}>
                    <p>{userState.currentUser.user_name}</p>
                    <i className={classnames("fi-br-angle-small-down", {
                        "hide": dropdown
                    })}/>
                </div>
                { dropdown &&
                    <div ref={ref}>
                        <NavbarDropdown logout={logout} dropdown={dropdown} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;