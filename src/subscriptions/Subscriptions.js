import React, { Component } from 'react';
import './Subscriptions.css';

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
            <div className="subscriptionsItem" onClick={this.itemSelected.bind(this)} style={{backgroundColor:this.state.selected ? "slategray" : "lightgray"}}>
                <img className="subItemImg" src={this.props.src} alt="" style={{backgroundColor: this.props.count > 0 && this.props.thin && !this.state.selected ? "lightseagreen" : ""}}/>
                <p className="subTitle" style={{display: this.props.thin ? "none" : "block"}}>{this.props.title}</p>
                <p className="subCount">{this.props.count > 0 && !this.props.thin? this.props.count : ''}</p>
            </div>
        );
    }
}

class Subscriptions extends Component {
    render() {
        return (
            <ul className="subscriptionsList" style={{minWidth: this.props.thin ? "53px" : "500px"}}>
                {this.props.subscriptions.map(
                    sub => <SubscriptionsItem key={sub.id} src={sub.iconUrl} title={sub.title} count={sub.count} thin={this.props.thin} onClick={()=>{this.props.subscriptionClicked(sub.id)}}/>
                )}
            </ul>
        );
    }
}
                    // sub => <SubscriptionsItem key={sub.id} src={sub.iconUrl} title={sub.title} count={sub.count} onClick={this.props.subscriptionClicked(sub.id)}/>

export default Subscriptions;