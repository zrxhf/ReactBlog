import React from 'react';
import config from "../config";
import $ from "jquery";

class CreateArticle extends React.Component {

    constructor() {
        super();
        this.state = {
            head: "Create an Article",
            content: "",
            link: "",
            title: "",
            tag: "Music",
            privacy: "public",
            buttonname: "Create",
            storyId:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        let user = JSON.parse(localStorage.getItem('user'));
        if (event.target.name === "Cancel") {
            window.location.href = "/";
        } else {
            $.ajax({
                url: `${config.apiUrl}/upload_edit_story.php`,
                method: "post",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    token: user.token,
                    title: this.state.title,
                    content: this.state.content,
                    link: this.state.link,
                    tag: this.state.tag,
                    privacy: this.state.privacy,
                    option: this.state.buttonname,
                    storyId: this.state.storyId,

                },
                success: function (databack) {
                    alert(databack);
                    window.location.href = "/";

                },
                error: function (databack) {
                    console.log(databack)
                }
            })

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.edit_create_mode === "edit") {
            this.setState({
                head: "Edit the Article:",
                title: nextProps.activeArticle.title,
                content: nextProps.activeArticle.content,
                link: nextProps.activeArticle.link,
                buttonname: "edit",
                storyId:nextProps.activeArticle.id
            })
        } else {
            this.setState({
                head: "Create an Article",
                content: "",
                link: "",
                title: "",
                tag: "Music",
                privacy: "public",
                buttonname: "create",
                storyId:""

            })
        }
    }


    render() {

        return (
            <div className="create_story">

                <h2 className="create_update_story">{this.state.head}</h2>
                <form className="text-center">
                    <h2>Title: </h2> <textarea onChange={this.handleInputChange} rows={1} cols={30} name="title"
                                               value={this.state.title}/>
                    <h2>Content: </h2><textarea onChange={this.handleInputChange} rows={10} cols={30} name="content"
                                                value={this.state.content}/>
                    <h2>Pic URL: </h2><textarea onChange={this.handleInputChange} rows={1} cols={30} name="link"
                                             value={this.state.link}/>
                    <h2>Select a Tag: </h2>
                    <div>
                        <select onChange={this.handleInputChange} name="tag">
                            <option value="Music">Music</option>
                            <option value="Sport">Sport</option>
                            <option value="Movie">Movie</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <h2>Set Privacy: </h2>
                    <div>
                        <select onChange={this.handleInputChange} name="privacy">
                            <option value="public">public</option>
                            <option value="friend">friend</option>
                            <option value="me">me</option>
                        </select>
                    </div>
                    <input type="hidden" name="storyId" defaultValue/>
                    <button onClick={this.handleSubmit} className="btn" type="submit" name="submit"
                            value="Submit">{this.state.buttonname}</button>
                    <button onClick={this.handleSubmit} name="Cancel">Cancel</button>
                </form>
            </div>


        );


    }

};

export default CreateArticle;