import React, { Component } from 'react';

const noop = () => undefined;

export default class Form extends Component {

    static propTypes = {
        formName: React.PropTypes.string.isRequired,
        children: React.PropTypes.node,
    };

    static defaultProps = {
        onSubmit: noop
    };

    validations = [];

    static childContextTypes = {
        formName: React.PropTypes.string
    };

    getChildContext() {
        return {
            formName: this.props.formName
        };
    }

    constructor (props, context) {
        super(props, context);
        console.log('context = ',this);
    }
    

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                {this.props.children}
            </form>
        );
    }
}