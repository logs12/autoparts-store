import React, { Component } from 'react';

export default class Form extends Component {

    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
    };

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