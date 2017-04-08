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
    render() {
        const now = new Date();
        const publishDate = new Date(this.props.timeStamp);
        const timeStamp = (now - publishDate) > 3600 * 24 ? publishDate.toLocaleDateString() : publishDate.toLocaleTimeString();
        return (
            <div className="titleItem" onClick={this.itemSelected.bind(this)} style={{backgroundColor:this.state.selected ? "slategray" : "lightgray"}}>
                    <img className="titleImg" src={this.props.src}/>
                <div className="titleTextBox" style={{color: this.state.read ? "darkgray" : "black"}}>
                    <p className="titleText">{this.props.title}</p>
                    <p className="titleAuthor">{this.props.subscription} - {this.props.author} - {timeStamp}</p>
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
            <ul className="titleList">
                {this.props.contents.map(
                    content => <TitleItem key={content.id} src={require("../img/avatar.jpg")} title={content.title} subscription={content.origin.title} author={content.author} timeStamp={content.published} content={content.summary.content} onClick={()=>{this.props.titleClicked(content.id)}} star={content.star} onStar={(stared)=>{this.props.onStar(content, stared)}}/>
                )}
            </ul>
        );
    }
}

export default Titles;