import React, { Component } from 'react';

const noop = () => undefined;

export default class Form extends Component {

    static propTypes = {
        children: React.PropTypes.node,
        values: React.PropTypes.object,
        update: React.PropTypes.func,
        reset: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    };

    static defaultProps = {
        onSubmit: noop
    };

    validations = [];

    constructor (props) {
        super(props);
    }
    

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                {this.props.children}
            </form>
        );
    }
}