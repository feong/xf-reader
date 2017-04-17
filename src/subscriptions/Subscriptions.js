import React, { Component } from 'react';
import './Subscriptions.css';
import {MEDIUM_GREEN} from '../util/colors';
import {STAR_ID} from '../util/urls';

let selectedItem;
class SubscriptionsItem extends Component {
    state = {selected: false}
    itemSelected() {
        if(selectedItem) selectedItem.setState({selected:false});
        this.props.onClick();
        this.setState({selected:true});
        selectedItem = this;
    }
    render() {
        return (
            <div className="subscriptionsItem" onClick={this.itemSelected.bind(this)} style={{backgroundColor:this.state.selected ? MEDIUM_GREEN[5] : MEDIUM_GREEN[0]}}>
                <img className="subItemImg" src={this.props.src} alt="" style={{backgroundColor: this.props.count > 0 && this.props.id.indexOf(STAR_ID) < 0 && this.props.thin && !this.state.selected ? MEDIUM_GREEN[1] : ""}}/>
                <p className="subTitle" style={{display: this.props.thin ? "none" : "block"}}>{this.props.title}</p>
                <p className="subCount">{this.props.count > 0 && !this.props.thin? this.props.count : ''}</p>
            </div>
        );
    }
}

class Subscriptions extends Component {
    state = {loading: false};
    onRefresh() {
        this.props.onRefresh((result)=>{
            result && this.setState({loading: false});
        });
        this.setState({loading: true});
    }
    render() {
        return (
            <div className="subscriptionsPanel">
                <div className="panelHeader">
                    {this.props.thin || <img className="refreshingButton" src={require('../img/refresh.svg')} alt="Refresh" onClick={this.onRefresh.bind(this)} style={{display: this.state.loading ? 'block' : 'none'}}/>}
                    {this.props.thin || <img className="refreshButton" src={require('../img/refresh.svg')} alt="Refresh" onClick={this.onRefresh.bind(this)} style={{display: this.state.loading ? 'none' : 'block'}}/>}
                    {this.props.thin || <img className="allreadButton" src={require('../img/allread.svg')} alt="Mark All Read" onClick={this.props.onReadAllUnreadArticles}/>}
                    {this.props.thin || <div className="blankSpace"/>}
                    {this.props.thin || <img className="exitButton" src={require('../img/exit.svg')} alt="Exit" onClick={this.props.onExit}/>}
                </div>
                <ul className="subscriptionsList" style={{width: this.props.thin ? "54px" : "300px", height: document.body.scrollHeight - 50}}>
                    {this.props.subscriptions.map(
                        sub => <SubscriptionsItem key={sub.id} id={sub.id} src={sub.iconUrl} title={sub.title} count={sub.count} thin={this.props.thin} onClick={()=>{this.props.subscriptionClicked(sub.id)}}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default Subscriptions;