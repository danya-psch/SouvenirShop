import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./../../Home";
import Town from "./../../about/Town";
import Contact from "./../../about/Contact";
import About from "./../../about/About"
import RegisterForm from "../../../components/register/RegisterForm";
import LoginPage from "../../../components//login/LoginPage";
import SouvenirsTable from "../../../components/souvenirs/SouvenirsTable";
import Profile from "../../user/MyUserPage";
import Breadcrumbs from './Breadcrumbs';

class Main extends Component {
    render() {
        return (
            <main role="main">
                <Breadcrumbs/>
                <Route exact path="/" component={Home}/>
                <Route path="/our_town" component={Town}/>
                <Route path="/about" component={About}/>
                <Route path="/about/contact" component={Contact}/>
                <Route path="/register" component={RegisterForm}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/souvenirs" component={SouvenirsTable}/>
                <Route path="/profile" component={Profile}/>
            </main>
        );
    }
}

export default Main;