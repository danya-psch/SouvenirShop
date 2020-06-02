import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import UserStatusBar from './UserStatusBar'
import { logout, getUserFromJWT } from '../../../actions/user';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };

    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     console.log("UNSAFE_componentWillReceiveProps");
    //     // if (this.props.location.pathname !== nextProps.location.pathname){
    //     //     this.changeNavItem(); 
    //     // }
    // }

    static mapStateToProps(store) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            logout: () => dispatch(logout()),
            initialLogin: () => dispatch(getUserFromJWT())
        };
    }

    componentDidMount() {
        this.props.initialLogin();     
    }


    render() {
        return (
            <header>
                <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <NavLink className="navbar-brand" to="/">Головна</NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link top_menu_item" to="/our_town">Наше улюблене місто</NavLink>
                                    
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link top_menu_item" to="/souvenirs">Сувеніри</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link top_menu_item" to="/about">Про нас</NavLink>
                                    
                                </li>
                            </ul>
                            <UserStatusBar user={this.props.user.user_object} logout={this.props.logout} />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const MyHeader = connect(Header.mapStateToProps, Header.mapDispatchToProps)(Header);

export default MyHeader;