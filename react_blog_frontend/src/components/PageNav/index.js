import React from 'react';

class PageNav extends React.Component {
    constructor() {
        super();
        this.state = {
            currentPage: "1",
        };
        this.handleClick = this.handleClick.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleClick(event) {
        event.preventDefault();
        if (event.target.innerHTML === "❮ Previous") {
            if (this.props.pageNumber > 1) {
                this.props.updatePage(this.props.pageNumber - 1);
            }
        } else if (event.target.innerHTML === "Next ❯"){
            if (this.props.pageNumber < JSON.parse(this.props.articles).pageNumber) {
                this.props.updatePage(this.props.pageNumber + 1);
            }
        } else if (event.target.innerHTML === "Last ❯❯"){
            this.props.updatePage(JSON.parse(this.props.articles).pageNumber);
        } else  {
            this.props.updatePage(1);
        }

    }


    render() {
        return (
            <nav className="flexbox mb-50">

                <a onClick={this.handleClick} className="btn btn-white disabled" href={void(0)}>❮❮ First</a>


                <a onClick={this.handleClick} className="btn btn-white disabled" href={void(0)}>❮ Previous</a>


                <input type="text" name="currentPage" value={this.props.pageNumber} className="currentPage"/>

                <a onClick={this.handleClick} className="btn btn-white" href={void(0)}>Next ❯</a>
                <a onClick={this.handleClick} className="btn btn-white" href={void(0)}>Last ❯❯</a>
                {/*<a className="btn btn-white disabled">*/}
                    {/*<i className="ti-arrow-left fs-9 mr-4"/> </a>*/}
            </nav>
        )
    }


}

export default PageNav;
