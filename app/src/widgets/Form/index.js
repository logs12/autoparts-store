import React, { Component } from 'react';

export default class Form extends Component {
    static propTypes = {
        children: React.PropTypes.node,
        values: React.PropTypes.object,
        update: React.PropTypes.func,
        reset: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    };

    render() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}