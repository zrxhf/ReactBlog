import React from 'react';
import Articles from '../Articles';
import HomeRight from '../HomeRight'
import $ from "jquery";
import config from "../config";


class HomeWrap extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: null,
            edit_create_mode:"create",
            activeArticle:null,
            page: 1
        }
    }

    componentWillMount(){
        if (!localStorage.getItem('user')){
            const url = `${config.apiUrl}/login.php`;
            let save = this;
            $.ajax({
                url: url,
                method: "post",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {
                    userName: "Guest",
                    password: "Guest"
                },
                success: function (databack) {
                    if (databack === "Successfully logged in"){
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
                        window.location.href = "/login";
                    }

                },
                error: function (databack) {
                    console.log(databack)
                }
            })
        }
    }
    componentDidUpdate(nextProps,nextState){
        if (this.state.page !== nextState.page){
            this.getArticle()
        }

    }
    getArticle(){
        let save = this;
        var url_string = window.location.href;
        var url = new URL(url_string);
        var username = url.searchParams.get("username");
        if(username == null) {
            if (localStorage.getItem('user')){
                username = JSON.parse(localStorage.getItem('user')).username;
            } else {
                username = "Guest"
            }

        }
        let min = url.searchParams.get("min");
        let max = url.searchParams.get("max");
        let tag = url.searchParams.get("tag");
        let data = {
            username:username,
            page: this.state.page
        };

        if (min && max){
            data = {
                username:username,
                datemin:min,
                datemax:max,
                page: this.state.page
            }
        }

        if (tag){
            data = {
                username:username,
                tag:tag,
                page: this.state.page
            }
        }


        $.ajax({
            url: `${config.apiUrl}/getStory2.php`,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            method:"post",
            data: data,
            success: function (databack) {
                console.log(databack);

                localStorage.setItem("articles", databack);
                save.setState({
                    articles: databack
                })
            }

        })
    }


    componentDidMount() {
        this.getArticle();
    }


    updateArticles = (articles) => {
        this.setState({articles: articles})
    };

    editArticle = (activeArticle)=>{
        this.setState({
            edit_create_mode: "edit",
            activeArticle:activeArticle
        })
    };

    updatePage =(pagenumber) =>{

        this.setState({page: pagenumber})



    };



    render() {
        return (

            <div className="wrapper row2">
                <div id="container" className="clear">
                    <Articles {...this.props} pageNumber = {this.state.page} updatePage={this.updatePage} updateArticles={this.updateArticles}  articles={this.state.articles} editArticle={this.editArticle}/>
                    <HomeRight {...this.props} updateArticles={this.updateArticles} edit_create_mode={this.state.edit_create_mode} activeArticle={this.state.activeArticle}/>

                </div>
            </div>
        );
    }


};

export default HomeWrap;