import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, checkUsername } from '../../actions/user';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
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
            registerUser: (formData) => dispatch(register(formData)),
            checkUsername: (username) => dispatch(checkUsername(username))
        };
    }

    formOnSubmit(event) {
        event.preventDefault();

        const form = document.getElementById("register");
        const formData = new FormData(form);
        this.props.registerUser(formData);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.currentTarget.value || ''});
    }

    handlePasswordChange(field) {
        const this_obj = this;
        return function(event) {
            const obj = {};
            if (typeof event.currentTarget.value === "undefined") {
                return;
            }
            obj[field] = event.currentTarget.value;
            this_obj.setState(obj);
        };  
    }

    render() {
        return (
            // <form id="register" onSubmit={this.formOnSubmit} /*method="post" action="/auth/register"*/>
            //     <input type="text" name="username" placeholder="Name" onChange={this.handleUsernameChange} required></input>
            //     <input type="password" name="password1" placeholder="Password" onChange={this.handlePasswordChange("password1")} required></input>
            //     <input type="password" name="password2" placeholder="Re-enter password" onChange={this.handlePasswordChange("password2")} required></input>
            //     <button type="submit" className="btn btn-dark" >Submit</button>    
            // </form>
            <form id="register" className="lrg_indent" onSubmit={this.formOnSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputLogin1">Логін:</label>
                    <input type="text" name="username" className="form-control" id="exampleInputLogin1" placeholder="Введіть Ім'я"
                    onChange={this.handleUsernameChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Пароль:</label>
                    <input type="password" name="password1" className="form-control" id="exampleInputPassword1" placeholder="Введіть пароль"
                    onChange={this.handlePasswordChange("password1")} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Підтвердження паролю:</label>
                    <input type="password" name="password2" className="form-control" id="exampleInputPassword2" placeholder="Введіть пароль"
                    onChange={this.handlePasswordChange("password2")} required/>
                </div>
                <button type="submit" className="btn btn-dark">Зареєструватися</button>
            </form>
        );
    }
}
const Form = connect(RegisterPage.mapStateToProps, RegisterPage.mapDispatchToProps)(RegisterPage);

export default Form;