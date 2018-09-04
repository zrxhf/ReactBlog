import React from 'react'
import config from "../config";
import $ from "jquery";

class Comment extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();


        // this.setState({
        //     [event.target.name]: event.target.value
        // })
        let user = JSON.parse(localStorage.getItem('user'));
        let save = this;
        if (event.target.name ==="Delete"){
            const url = `${config.apiUrl}/delete_comment.php`;
            $.ajax( {
                url: url,
                method: "post",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    token:user.token,
                    commentId:this.props.comment.id,
                },
                success: function (databack) {
                    alert(databack);
                    window.location.href = "/detail?storyId="+save.props.comment.news_id;
                }
            })
        } else if (event.target.name ==="Edit"){
            this.props.editComment(this.props.comment);
        }

    }



    render(){

        let comment = this.props.comment? this.props.comment:null;

        return(
            <li>
                <article className="clear">
                    <h6>Comment</h6>
                    <figure>
                        <figcaption>
                            <a className="comment_user" href={"/?username="+comment.username}>{comment?comment.username:null}</a>
                            <p className="comment_content">{comment?comment.content:null}</p>
                            <footer className="more">
                                {comment.user_id===this.props.userid?<button onClick={this.handleSubmit} name="Delete" title={comment?comment.id:null}>Delete</button>:null}
                                {comment.user_id===this.props.userid?<button onClick={this.handleSubmit} name="Edit" title={comment?comment.id:null}>Edit</button>:null}
                            </footer>
                        </figcaption>
                    </figure>
                </article>
            </li>
        )
    }
}

export default Comment;