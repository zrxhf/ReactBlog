import React from 'react';
import $ from "jquery";
import config from '../config'

class SignUp extends React.Component {
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
        const url = `${config.apiUrl}/signup.php`;
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
                if (databack === "Successfully registered"){
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
                    window.location.href = "/signup";
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

            <div className="sign_up">
                <form className="sign_up">
                    <div>
                        User Name: <input onChange={this.handleInputChange} className="username" type="text"
                                          name="username"/>
                    </div>
                    <div>
                        Password: <input onChange={this.handleInputChange} className="password" type="password"
                                         name="password"/>
                    </div>
                    <input onClick={this.handleSubmit} className="button" type="submit" defaultValue="Join Today"
                           name="submit"/>
                </form>
                <div className="ask_status">
                    <p className="ask_status">Already a member?</p>
                    <a className="ask_status" href="/login">Sign In</a>
                </div>
            </div>
        );
    }
};

export default SignUp;