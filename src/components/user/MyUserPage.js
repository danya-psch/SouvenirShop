import React, { Component } from "react";
import { connect } from 'react-redux';

class MyUserPage extends Component {
    constructor(props) {
        super(props);
    }

    static mapStateToProps(store) {
        return { user: store.user };
    }
  
    render() {
        const user = this.props.user.user_object;
        return (
            <div className="center_list_page">
                <img src={user.ava_url} alt="ava"/>
                <h5>Ім'я: {user.name}</h5>
                <div>Роль користувача: {user.role}</div>
            </div>
        );
    }
}


const Page = connect(MyUserPage.mapStateToProps)(MyUserPage);

export default Page;