import React from 'react';
import $ from "jquery";
import config from "../config";

class MakeComment extends React.Component{

    constructor(){
        super()
        this.state = {
            head: "Make an Comment",
            comment: "",
            buttonname: "Create",
            commentId:""
        }
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
        let save = this;
        let user = JSON.parse(localStorage.getItem('user'));
        if (event.target.name === "Cancel") {
            window.location.href = "/detail?storyId="+this.props.storyId;
        } else {
            $.ajax({
                url: `${config.apiUrl}/make_edit_comment.php`,
                method: "post",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    token: user.token,
                    comment: this.state.comment,
                    storyId: this.props.storyId,
                    commentId:this.state.commentId
                },
                success: function (databack) {
                    alert(databack);
                    window.location.href = "/detail?storyId="+save.props.storyId;

                },
                error: function (databack) {
                    console.log(databack)
                }
            })

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.edit_create_comment === "edit") {
            this.setState({
                head: "Edit the Comment:",
                comment: nextProps.activeComment.content,
                buttonname: "Edit",
                commentId:nextProps.activeComment.id
            })
        } else {
            this.setState({
                head: "Create a Comment",
                comment: "",
                buttonname: "Create",
                commentId:""

            })
        }
    }




    render(){
        return(

            <aside id="right_column">
                <div className="make_comment">
                    <h2 className="make_comment">{this.state.head}</h2>
                    <form className="text-center">
                        <textarea onChange={this.handleInputChange} rows={15} cols={35} name="comment" value={this.state.comment}/>
                        <button onClick={this.handleSubmit} className="btn" type="submit" name="submit" value="Submit">{this.state.buttonname}</button>
                        <button onClick={this.handleSubmit} name="Cancel">Cancel</button>
                    </form>
                </div>
            </aside>



        )



    }


}
export default MakeComment;