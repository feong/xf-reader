import React, { Component } from 'react';
import './Titles.css';

let selectedItem;
class TitleItem extends Component {
    state = {selected: false, read: false, star: false}
    itemSelected() {
        if(selectedItem) selectedItem.setState({selected:false});
        this.props.onClick();
        if(!this.read) {
            // TODO: make this readed on the Server
        }
        this.setState({selected: true, read: true});
        selectedItem = this;
    }
    itemStar(event) {
        event.stopPropagation();
        this.props.onStar(!this.props.star);
    }
    findTheFirstImgSrc(article) {
        const firstImgIndex = article.indexOf('<img') || article.indexOf('<IMG>');
        if(firstImgIndex > 0) {
            const imgText = article.substring(firstImgIndex);
            const imgSrcIndex = imgText.indexOf('src=');
            // const imgSrcEndIndex = imgText.indexOf('\'') ||  imgText.indexOf('\"');
            const imgSrcEndIndex = imgText.indexOf('\"', imgSrcIndex + 5) ||  imgText.indexOf('\'', imgSrcIndex + 5);
            const imgSrc = imgText.substring(imgSrcIndex + 5, imgSrcEndIndex);
            return imgSrc;
        }
        return null;
    }
    render() {
        const now = new Date();
        const publishDate = new Date(this.props.timeStamp);
        const timeStamp = (now - publishDate) > 3600 * 24 ? publishDate.toLocaleDateString() : publishDate.toLocaleTimeString();
        const img = this.findTheFirstImgSrc(this.props.article);
        return (
            <div className="titleItem" onClick={this.itemSelected.bind(this)} style={{backgroundColor:this.state.selected ? "slategray" : "lightgray"}}>
                {img && <div className="titleImg" style={{backgroundImage:`url(${img})`}}/>}
                <div className="titleTextBox" style={{color: this.state.read ? "darkgray" : "black"}}>
                    <p className="titleText">{this.props.title}</p>
                    <p className="titleAuthor">{this.props.subscription} - {this.props.author || "匿名"} - {timeStamp}</p>
                </div>
                <div className="titleButtons">
                    <p className="titleStar" onClick={this.itemStar.bind(this)} style={{color: this.props.star ? "yellow" : "rgba(0, 0, 0, 0.5)"}}>★</p>
                    <p className="titleLater" color={"yellow"}>＋</p>
                </div>
            </div>
        );
    }
}

class Titles extends Component {
    componentWillUnmount() {
        selectedItem = null;
    }
    render() {
        if(!this.props.contents) {
            return null;
            // return (<ul className="titleList"></ul>);
        }
        return (
            <ul className="titleList" style={{height: document.body.scrollHeight}}>
                {this.props.contents.map(
                    content => <TitleItem key={content.id} src={require("../img/avatar.jpg")} article={content.summary.content} title={content.title} subscription={content.origin.title} author={content.author} timeStamp={content.published * 1000} onClick={()=>{this.props.titleClicked(content.id)}} star={content.star} onStar={(stared)=>{this.props.onStar(content, stared)}}/>
                )}
            </ul>
        );
    }
}

export default Titles;