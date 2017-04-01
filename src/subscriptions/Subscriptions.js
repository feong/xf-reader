import React, { Component } from 'react';

class SubscriptionsItem extends Component {
    render() {
        return (
            <div>
                <img className="subItem" src={this.props.src}/>
                <p className="subTitle"/>
            </div>
        );
    }
}

class Subscriptions extends Component {
    render() {
        return (
            <SubscriptionsItem/>
        );
    }
}

export default Subscriptions;