import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/user';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.formOnSubmit = this.formOnSubmit.bind(this);
    }

    static mapStateToProps(store) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch) {
        return {
            login: (username, password) => dispatch(authenticate(username, password))
        };
    }

    formOnSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);     
    }

    handleUsernameChange(event) {
        this.setState({ username: event.currentTarget.value || ''});
    }

    handlePasswordChange(event) { 
        this.setState({ password: event.currentTarget.value || ''});
    }

    render() {
        return (
            <form id="login" className="lrg_indent" onSubmit={this.formOnSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="exampleInputLogin1">Логін:</label>
                    <input type="text" name="username" className="form-control" id="exampleInputLogin1" placeholder="Введіть Ім'я"
                    onChange={this.handleUsernameChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Пароль:</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Введіть пароль"
                    onChange={this.handlePasswordChange} required/>
                </div>
                <button type="submit" className="btn btn-dark">Увійти</button>
            </form>
        );
    }
}

const Form = connect(LoginPage.mapStateToProps, LoginPage.mapDispatchToProps)(LoginPage);

export default Form;