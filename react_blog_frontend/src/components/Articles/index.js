import React from 'react';

import Article from '../Article'

import PageNav from '../PageNav'


class Articles extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: null,
        }
    }

    render() {
        console.log(this.props.articles);
        let hhh=null;
        if (this.props.articles){
            let articles = JSON.parse(this.props.articles).articles;
            let userid = JSON.parse(this.props.articles).userid;
            hhh =  (articles.map(article => (

                    <Article {...this.props} article={article} userid={userid}/>

            )))
            console.log("afterupdate", articles);
        }

        return (
            <div id="content">
                <section id="latest" className="last">
                    <h5>Articles</h5>
                    <ul className="stories">
                        {hhh}
                    </ul>
                </section>
                <PageNav {...this.props}>
                </PageNav>
            </div>
        );
    }

}

export default Articles;