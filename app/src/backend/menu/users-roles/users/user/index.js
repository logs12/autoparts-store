import React, { Component } from 'react'
import Article from '../../../../../widgets/article/component';

export default class UserView extends Component {
    render() {
        //debugger;
        return (
            <Article>{this.props.params.id}
            </Article>
        )
    }
}