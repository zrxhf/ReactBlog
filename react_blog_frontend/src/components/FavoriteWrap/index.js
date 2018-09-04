import React from 'react';
import Articles from '../Articles';
import $ from "jquery";
import config from "../config";


class FavoriteWrap extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: null,
        }
    }

    componentDidMount() {
        let save = this;
        $.ajax({
            url: `${config.apiUrl}/getFavoriteArticles.php`,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (databack) {
                console.log(databack);

                localStorage.setItem("favoriteArticles", databack);
                save.setState({
                    articles: databack
                })
            }
            //localStorage.setItem("articles",databack);

        })
    }


    // updateArticles = (articles) => {
    //     this.setState({articles: articles})
    // };


    render() {
        return (

            <div className="wrapper row2">
                <div id="container" className="clear">
                    <Articles {...this.props} articles={this.state.articles} isFav={true}/>
                </div>
            </div>
        );
    }


};

export default FavoriteWrap;