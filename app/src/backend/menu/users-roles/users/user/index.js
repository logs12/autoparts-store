import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from '../../../../../widgets/article/component';

@connect(
    (state,ownProps) => {
        return {
            id: ownProps.params.id,
            filter: ownProps.location.query.filter
        };
    }
)
export default class UserView extends Component {
    render() {
        debugger;
        return (
            <Article>{this.props.params.id}
            </Article>
        )
    }
}