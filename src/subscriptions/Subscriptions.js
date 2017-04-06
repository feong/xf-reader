import React, { Component } from 'react';
import './Subscriptions.css';

class SubscriptionsItem extends Component {
    render() {
        return (
            <div className="subscriptionsItem" onClick={this.props.onClick}>
                <img className="subItemImg" src={this.props.src} alt=""/>
                <p className="subTitle">{this.props.title}</p>
                <p className="subCount">{this.props.count > 0 ? this.props.count : ''}</p>
            </div>
        );
    }
}

class Subscriptions extends Component {
    render() {
        return (
            <ul className="subscriptionsList">
                {this.props.subscriptions.map(
                    sub => <SubscriptionsItem key={sub.id} src={sub.iconUrl} title={sub.title} count={sub.count} onClick={()=>{this.props.subscriptionClicked(sub.id)}}/>
                )}
            </ul>
        );
    }
}
                    // sub => <SubscriptionsItem key={sub.id} src={sub.iconUrl} title={sub.title} count={sub.count} onClick={this.props.subscriptionClicked(sub.id)}/>

export default Subscriptions;