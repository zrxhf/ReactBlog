import React from 'react';
import config from "../config";
import $ from 'jquery';
import logo from './img_5.jpg';
class Article extends React.Component {
    constructor() {
        super();
        this.state = {
            option: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event){
        event.preventDefault();
        const url = `${config.apiUrl}/delete_view.php`;
        // this.setState({
        //     [event.target.name]: event.target.value
        // })
        let user = JSON.parse(localStorage.getItem('user'));

        if (event.target.name ==="Delete"){
            $.ajax( {
                url: url,
                method: "post",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    option:event.target.name,
                    token:user.token,
                    storyId:this.props.article.id,
                },
                success: function (databack) {
                    alert(databack);
                    window.location.href = "/";
                }
            })
        } else if (event.target.name ==="View"){
            window.location.href = "/detail?storyId="+event.target.title;
        } else {
          this.props.editArticle(this.props.article);
        }

    }


    render() {
        let article = this.props.article;
        return (
            <li>
                <article className="clear">
                    <figure>
                        <img src={article.link||logo} alt={logo}/>
                        <figcaption>
                            <h2 className="story_title">
                                <a href="#">{article.title}</a>
                            </h2>
                            <div>
                                {article.time}
                            </div>
                            <a className="story_user" href={'?username='+ article.username}>{article.username}</a>
                            <p className="story_content">{article.content}</p>
                            <div>
                                {article.privacy}
                            </div>
                            <div>
                                {article.tag}
                            </div>


                            <footer className="more">
                                {article.userid===this.props.userid?<button onClick={this.handleSubmit} name="Delete" value="Delete" title={article.id}>Delete</button>:null}
                                {article.userid===this.props.userid?<button onClick={this.handleSubmit} name="Edit" value = "Edit" title={article.id}>Edit</button>:null}

                                <button onClick={this.handleSubmit} name="View" value="View" title={article.id}>View</button>
                                 </footer>
                        </figcaption>
                    </figure>
                </article>
            </li>
        );
    }


};

export default Article;