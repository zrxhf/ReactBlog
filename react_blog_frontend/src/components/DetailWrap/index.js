import React from 'react';
import $ from "jquery";
import config from "../config";
import Comments from "../Comments";
import DetailArticle from "../DetailArticle";
import MakeComment from "../MakeComment";

class DetailWrap extends React.Component {
    constructor() {
        super();
        this.state = {
            article:null,
            comments: null,
            edit_create_comment:"create",
            activeComment:null,
            storyId:null

        }
    }

    componentDidMount() {
        let save = this;
        var url_string = window.location.href;
        var url = new URL(url_string);
        var storyId = url.searchParams.get("storyId");
        if(storyId != null) {
            this.setState({
                storyId:storyId
            });
            $.ajax({
                url: `${config.apiUrl}/getStory2.php`,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                method: "post",
                data: {
                    storyId: storyId
                },
                success: function (databack) {
                    console.log(databack);

                    localStorage.setItem("detail_article", databack);
                    save.setState({
                        article: databack
                    })

                    $.ajax({
                        url: `${config.apiUrl}/getComments.php`,
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        method: "post",
                        data: {
                            storyId: storyId
                        },
                        success: function (databack) {
                            console.log(databack);

                            localStorage.setItem("comments", databack);
                            save.setState({
                                comments: databack
                            })
                        }
                    })



                }

            })
        }
    }


    updateComments = (comments) => {
        this.setState({comments: comments})
    };

    editComment = (activeComment)=>{
        this.setState({
            edit_create_comment: "edit",
            activeComment:activeComment
        })
    };


    render() {
        return (

            <div className="wrapper row2">
                <div id="container" className="clear">
                    <div id="content">
                        <DetailArticle {...this.props} article={this.state.article}/>
                        <Comments {...this.props} comments={this.state.comments} editComment={this.editComment} />
                    </div>

                    {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"?<MakeComment  {...this.props} storyId = {this.state.storyId} updateComments={this.updateComments} edit_create_comment={this.state.edit_create_comment} activeComment={this.state.activeComment}/>:null}
                </div>
            </div>


        );
    }


};

export default DetailWrap;