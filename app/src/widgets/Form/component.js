import React, { Component } from 'react';

export default class Form extends Component {

    static propTypes = {
        submitHandle: React.PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);
    }
    
    render() {
        return (
            <form onSubmit={this.props.submitHandle}>
                {this.props.children}
            </form>
        );
    }
}