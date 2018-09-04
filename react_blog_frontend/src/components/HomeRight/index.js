import React from 'react';
import CreateArticle from '../CreateArticle'
import Categories from  '../Categories'
class HomeRight extends React.Component {
    constructor() {
        super();
        this.state = {
            date: "",
            min:null,
            max:null
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



    handleSubmit(event){
        event.preventDefault();
        var url_string = window.location.href;
        var url = new URL(url_string);
        var username = url.searchParams.get("username");
        if (this.state.min && this.state.max){
            if (username){
                window.location.href = "/?username="+username+"&min="+this.state.min+"&max="+this.state.max;
            } else {
                window.location.href = "/?min="+this.state.min+"&max="+this.state.max;

            }
        }



    }
    render() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var username = url.searchParams.get("username");
        let createArticleElm = null;
        if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).username !=="Guest"){
            if (username && JSON.parse(localStorage.getItem("user")).username!== username){
                createArticleElm == null;
            } else {
                createArticleElm= (<CreateArticle {...this.props}/>)
            }
        }

        return (

            <aside id="right_column">
                <Categories/>
                {/*<Calendar/>*/}
                <div>

                    <h2>Show Articles from: </h2> <input onChange={this.handleInputChange} type="date" name="min"/>
                    <h2>To: </h2> <input onChange={this.handleInputChange} type="date"  name="max"/>
                    <br/>
                    <button onClick={this.handleSubmit} className="btn" type="submit" name="submit"
                            value="Submit">Submit</button>

                </div>
                {createArticleElm}
            </aside>
        )
    }


}

export default HomeRight;