import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class UserStatusBar extends Component {

    guestView() {
        return (
            <li className="nav-item dropdown clean_list_el">
                <a className="nav-link dropdown-toggle white_ref" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My account
                </a>
                <div className="dropdown-menu dropdown-menu-right lrg_dropdown_menu" aria-labelledby="navbarDropdown">
                    <div className="dropdown-item white_bg_ref">
                        <NavLink className="btn btn_dark login_btn" role="button" to="/login">Login</NavLink>
                    </div>
                    <div className="dropdown-divider"></div>
                    <NavLink className="dropdown-item white_bg_ref" role="button" to="/register">Register</NavLink>
                </div>
            </li>
        );
    }

    userView(user) {
        return (
            <li className="nav-item dropdown clean_list_el">
                <a className="nav-link dropdown-toggle white_ref" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { user ? user.name : "" }
                </a>
                <div className="dropdown-menu dropdown-menu-right lrg_dropdown_menu" aria-labelledby="navbarDropdown">
                    <NavLink className="dropdown-item white_bg_ref" role="button" to="/profile" user={ user }>Profile</NavLink>
                    {/* <a className="dropdown-item white_bg_ref" href="#">Another action</a> */}
                    <div className="dropdown-divider"></div>
                    <button onClick={this.props.logout} className="dropdown-item white_bg_ref" type="submit">Logout</button>
                </div>
            </li>
        );
    }

    render() {
        const user = this.props.user;
        return ( user ? this.userView(user) : this.guestView() );
    }
}

export default UserStatusBar;