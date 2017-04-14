import React, { Component } from 'react';
import './Titles.css';
import {MEDIUM_GREEN} from '../util/colors';

let selectedItem;
class TitleItem extends Component {
    state = {selected: false, star: false}
    itemSelected() {
        if(selectedItem === this) {
            return;
        }
        if(selectedItem) {
            selectedItem.setState({selected:false});
        }
        this.props.clickArticle();
        this.setState({selected: true});
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
            <div className="titleItem" onClick={this.itemSelected.bind(this)} style={{backgroundColor:this.state.selected ? MEDIUM_GREEN[5] : MEDIUM_GREEN[0]}}>
                {img && <div className="titleImg" style={{backgroundImage:`url(${img})`}}/>}
                <div className="titleTextBox" style={{color: this.props.read ? "darkgray" : "black"}}>
                    <p className="titleText">{this.props.title}</p>
                    <p className="titleAuthor">{this.props.subscription} - {this.props.author || "匿名"} - {timeStamp}</p>
                </div>
                <div className="titleButtons">
                    <img className="titleStar" onClick={this.itemStar.bind(this)} src={this.props.star ? require("../img/star.svg") : require("../img/unstar.svg")}/>
                    <img className="titleLater" src={this.props.later ? require("../img/add.svg") : require("../img/unadd.svg")}/>
                </div>
            </div>
        );
    }
}

class Titles extends Component {
    state = {loading: false};
    componentWillUnmount() {
        selectedItem = null;
    }
    onScrolling(e) {
        var element = e.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight && this.props.hasMore){
            this.props.onContinueLoad();
            this.setState({loading: true});
        } else if (element.scrollHeight - element.scrollTop - 33 < element.clientHeight && this.props.hasMore) {
            this.setState({loading: false});
        }
    }
    render() {
        if(!this.props.contents) {
            return null;
            // return (<ul className="titleList"></ul>);
        }
        return (
            <div className="titlePanel" > 
                <div className="panelHeader">
                    <img className="refreshButton" src={require('../img/refresh.svg')} alt="Refresh"/>
                    <img className="readButton" src={require('../img/read.svg')} alt="Mark Read"/>
                    <img className="allreadButton" src={require('../img/allread.svg')} alt="Mark All Read"/>
                </div>
                <div className="titleListPanel" style={{height: document.body.scrollHeight - 50}} onScroll={this.onScrolling.bind(this)}>
                    <ul className="titleList">
                        {this.props.contents.map(
                            content => <TitleItem key={content.id} src={require("../img/avatar.jpg")} article={content.summary.content} title={content.title} subscription={content.origin.title} author={content.author} read={content.read} timeStamp={content.published * 1000} clickArticle={()=>{this.props.clickArticle(content)}} star={content.star} onStar={(stared)=>{this.props.onStar(content, stared)}}/>
                        )}
                    </ul>
                    {this.props.hasMore && (this.state.loading ? <p><b>Loading more</b></p> : <p><b>Load more</b></p>)}
                </div>
            </div>
        );
    }
}

export default Titles;