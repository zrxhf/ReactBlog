import React from 'react';
import $ from "jquery";
import config from "../config";

class Header extends React.Component{

    constructor(){
        super();
    }
    handleSubmit(event) {
        event.preventDefault();
        const url = `${config.apiUrl}/logout.php`;

        $.ajax({
            url: url,
            method: "post",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (databack) {
                console.log(databack)
                localStorage.removeItem('user');
                window.location.href = "/";

            },
            error: function (databack) {
                console.log(databack)
            }
        })
    }
    render(){
        return (

            <div className="wrapper row1">
                <header id="header" className="clear">
                    <div id="hgroup">
                        <h1>React Blog</h1>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/favorite">Favorite</a></li>
                            <li><a href="friend">Friends</a></li>
                            {this.props.authUser && JSON.parse(this.props.authUser).username !=="Guest"? <li><a onClick={this.handleSubmit} href={void(0)}>Log Out</a></li>:null}


                            {!this.props.authUser || JSON.parse(this.props.authUser).username ==="Guest" ? <li><a href="/login">Sign In</a></li> :null}
                            {!this.props.authUser || JSON.parse(this.props.authUser).username ==="Guest" ? <li><a href="/signup">Sign Up</a></li> :null}
                        </ul>

                    </nav>
                </header>
            </div>
        )
    }

}

export default Header;

