import React, { Component } from 'react';

class SubscriptionsItem extends Component {
    render() {
        return (
            <div>
                <img className="subItem" src={this.props.src}/>
                <p className="subTitle">{this.props.title}</p>
            </div>
        );
    }
}

class Subscriptions extends Component {
    render() {
        return (
            <SubscriptionsItem src={this.props.src} title={this.props.title}/>
        );
    }
}

export default Subscriptions;