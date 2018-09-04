import React from 'react';
import $ from "jquery";
import config from '../config'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        const url = `${config.apiUrl}/login.php`;
        let save = this;
        $.ajax({
            url: url,
            method: "post",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: {
                userName: this.state.username,
                password: this.state.password
            },
            success: function (databack) {
                if (databack === "Successfully logged in"){
                    $.ajax({
                        url: `${config.apiUrl}/getUser.php`,
                        method: "post",
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        success:function (databack) {
                            localStorage.setItem('user', databack);
                            save.props.setAuthUser(databack);
                            // save.props.history.push('/')
                            window.location.href = "/";
                        }
                    })

                } else {
                    alert(databack);
                    window.location.href = "/login";
                }


            },
            error: function (databack) {
                console.log(databack)
            }
        })
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (

            <div className="sign_in">
                <form className="sign_in">
                    <div>
                        User Name: <input onChange={this.handleInputChange} className="username" type="text"
                                          name="username"/>
                    </div>
                    <div>
                        Password: <input onChange={this.handleInputChange} className="password" type="password"
                                         name="password"/>
                    </div>
                    <input onClick={this.handleSubmit} className="button" type="submit" defaultValue="Sign In"
                           name="submit"/>
                </form>
                <div className="ask_status">
                    <p className="ask_status">Not a Member?</p>
                    <a className="ask_status" href="/signup">Sign Up</a>
                </div>
            </div>
        );
    }
};

export default Login;