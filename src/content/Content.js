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
            <div className="content">
                <div className="panelHeader">
                    <img className="starButton" onClick={this.itemStar.bind(this)} src={article.star ? require("../img/star.svg") : require("../img/unstar.svg")}/>
                    <img className="laterButton" src={article.later ? require("../img/add.svg") : require("../img/unadd.svg")}/>
                </div>
                <div className="innerContent" style={{height: document.body.scrollHeight - 90}}>
                    <h1 className="title">{article.title}</h1>
                    <h5 className="author">{article.origin.title} - {article.author || "匿名"} - {timeStamp}</h5>
                    <article className="article" dangerouslySetInnerHTML={{__html: article.summary.content}}/>
                </div> 
            </div>
        );
    }
}

export default Content;