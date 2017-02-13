import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../../../../actions/UserAction';
import Article from '../../../../../widgets/article/component';


const mapStateToProps = (state, ownProps) => {
    let userId = Number(ownProps.params.id);
    let user = _.find(state.Users, {id: userId});
    return {
        users: state.Users,
        user: user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(actions, dispatch)
    }
};

@connect(mapStateToProps, mapDispatchToProps)

export default class UserView extends Component {

    componentWillMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.userActions.UsersGetAction();
        }
    }

    render() {
        return (
            <div className="user-view-page">
                {(!_.isEmpty(this.props.user)) ?
                <Article>
                    <p>{this.props.user.first_name}</p>
                    <p>{this.props.user.second_name}</p>
                    <p>{this.props.user.third_name}</p>
                    <p>{this.props.user.email}</p>
                    <p>{this.props.user.phone}</p>
                </Article>
                : null}
            </div>
        )
    }
}