import React from "react";
import $ from "jquery";
import config from "../config";

class DetailArticle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            favorite:"Favorite",
            favoritetime:0

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }




    componentWillUpdate(){
        let save = this;
        if (this.props.article) {
            let article = JSON.parse(this.props.article).articles;

            $.ajax({
                url: `${config.apiUrl}/checkFavorite.php`,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                method: "post",
                data: {
                    news_id:article[0].id
                },
                success: function (databack) {
                    console.log(databack);
                    if (databack === "true") {
                        save.setState({
                            favorite: "Cancel Favorite",
                            favoritetime:article[0].favorite
                        })
                    } else {
                        save.setState({
                            favorite: "Favorite",
                            favoritetime:article[0].favorite
                        })
                    }
                }
                //localStorage.setItem("articles",databack);

            })
        }
    }

    handleSubmit(event){
        event.preventDefault();
        let save = this;
        $.ajax({
            url: `${config.apiUrl}/updateFavorite.php`,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            method:"post",
            data:{
                storyId:JSON.parse(this.props.article).articles[0].id,
                option: event.target.innerHTML
            },
            success: function (databack) {
                console.log(databack);
                if (databack === "true"){
                    save.setState({
                        favorite: "Cancel Favorite"
                    })
                } else {
                    save.setState({
                        favorite: "Favorite"
                    })
                }
                window.location.href = "/detail?storyId="+JSON.parse(save.props.article).articles[0].id;
            }
            //localStorage.setItem("articles",databack);

        })
    }



    render(){
        let article = null;
        if (this.props.article){
            article = JSON.parse(this.props.article).articles;
        };


        return (
            <section className="first">
                <h5>Story</h5>

                <article>
                    <h2 className="story_detail_title">{article? article[0].title:null}</h2>
                    <p className="story_detail_content">{article? article[0].content:null}</p>
                    {localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"?<div className="favoritediv">
                        <button onClick={this.handleSubmit} id="favorite_button" style={{visibility: article?'visible':'hidden'}}>{this.state.favorite}</button>
                        <h5 className="fav_time" style={{visibility: article?'visible':'hidden'}}>{article?article[0].favorite:0}</h5>
                    </div>:null}
                </article>
                {/* / articles */}
            </section>
        )
    }
}
export default DetailArticle;