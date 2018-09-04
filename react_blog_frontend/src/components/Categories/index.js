import React from 'react';

class Categories extends React.Component {
    constructor() {
        super();
    }

    render() {

        let url_string = window.location.href;
        let url = new URL(url_string);
        let username = url.searchParams.get("username");
        let href = "";
        if (username) {
            href = "/?username=" + username + "&tag=";
        } else {
            href = "/?tag=";

        }

        return (
            <div>
                <h2 className="title">Categories</h2>
                <nav>
                    <ul>
                        <li><a href={href+"All"}>All</a></li>
                        <li><a href={href+"Music"}>Music</a></li>
                        <li><a href={href+"Sport"}>Sport</a></li>
                        <li><a href={href+"Other"}>Other</a></li>
                    </ul>
                </nav>
            </div>


        )
    }
}

export default Categories;