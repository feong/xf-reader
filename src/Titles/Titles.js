import React, { Component } from 'react';
import './Titles.css'

class TitleItem extends Component {
    state = { status:'unread' }
    render() {
        const now = new Date();
        const publishDate = new Date(this.props.timeStamp);
        const timeStamp = (now - publishDate) > 3600 * 24 ? publishDate.toLocaleDateString() : publishDate.toLocaleTimeString();
        return (
            <div className="titleItem" onClick={this.props.onClick}>   
                <div>
                    <img className="titleStar"/>
                    <img className="titleImg" src={this.props.src}/>
                </div>
                <div className="titleTextBox">
                    <p className="titleText">{this.props.title}</p>
                    <p className="titleAuthor">{this.props.subscription} - {this.props.author} - {timeStamp}</p>
                </div>
                <p className="titleLater">＋</p>
            </div>
        );
    }
}

class Titles extends Component {
    render() {
        return (
            <ul className="titleList">
                {this.props.contents.map(
                    content => <TitleItem key={content.id} src={require("../img/avatar.jpg")} title={content.title} subscription={content.origin.title} author={content.author} timeStamp={content.published} content={content.summary.content} onClick={()=>{this.props.titleClicked(content.id)}}/>
                )}
            </ul>
        );
    }
}

export default Titles;