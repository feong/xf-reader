import React, { Component } from 'react';
import './Content.css';

class Content extends Component {
    itemStar(event) {
        event.stopPropagation();
        this.props.onStar(this.props.content, !this.props.content.star);
    }
    render() {
        const article = this.props.content;
        if(!article) {
            return null;
            // return (<div className="content"></div>);
        }
        const timeStamp = new Date(article.published * 1000).toLocaleString();
        return (
            <div className="content" style={{height: document.body.scrollHeight}}>
                <div className="innerContent">
                <div className="functionBar">
                    <span className="starButton" style={{color: article.star ? "yellow" : "rgba(0, 0, 0, 0.5)"}} onClick={this.itemStar.bind(this)}>★</span>
                    <span className="plusButton">+</span>
                </div>
                <h1 className="title">{article.title}</h1>
                <h5 className="author">{article.origin.title} - {article.author || "匿名"} - {timeStamp}</h5>
                <article className="article" dangerouslySetInnerHTML={{__html: article.summary.content}}/>
                </div> 
            </div>
        );
    }
}

export default Content;