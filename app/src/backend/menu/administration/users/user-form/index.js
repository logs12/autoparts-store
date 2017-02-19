import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { UsersGetAction } from '../../../../actions/UserAction';
import _ from 'lodash';
import Form from '../../../../../common/widgets/form/container';
import {InputText} from '../../../../../common/widgets/input-text/container';
import ButtonLoading from '../../../../../common/widgets/button-loading/container';


import { USER_URL_REQUEST } from "../../../../../common/constants";

const mapToStateProps = (state, ownProps) => {
    return {
        userId: Number(ownProps.params.id),
        users: state.backend.Users.collection,
        user: _.find(state.backend.Users.collection, {id: Number(ownProps.params.id)}),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        usersGetAction: bindActionCreators(UsersGetAction, dispatch)
    }
};

@connect(mapToStateProps, mapDispatchToProps)

export default class UserForm extends Component {

    /**
     * Name action for formWidget
     * @type {string}
     */
    formAction = 'UserCreateAction';

    componentWillMount() {
        // If entity update
        if (this.props.userId) {
            if (!this.props.users.length) {
                this.props.usersGetAction(this.props.userId);
            }
            this.formAction = 'UserUpdateAction';
        }
    }

    render () {

        return (
            <div className="mdl-card mdl-shadow--2dp wide">
                <Form
                    actionName={this.formAction}
                    formName="userForm"
                    model={this.props.user}
                    url={USER_URL_REQUEST(this.props.userId)}>
                    <div className="mdl-grid">
                        <InputText
                            name = 'first_name'
                            placeholder = 'First name'
                            className="mdl-cell mdl-cell--4-col"
                        />
                        <InputText
                            name = 'second_name'
                            placeholder = 'Second name'
                            className="mdl-cell mdl-cell--4-col"
                        />

                        <InputText
                            name = 'third_name'
                            placeholder = 'Third name'
                            className="mdl-cell mdl-cell--4-col"
                        />
                    </div>

                    <div className="mdl-grid">
                        <InputText
                            name = 'phone'
                            placeholder = 'Phone'
                            className="mdl-cell mdl-cell--4-col"
                        />
                        <InputText
                            name = 'email'
                            placeholder = 'Email'
                            className="mdl-cell mdl-cell--4-col"
                        />
                        <InputText
                            name = 'password'
                            placeholder = 'Password'
                            className="mdl-cell mdl-cell--4-col"
                        />
                    </div>
                    <ButtonLoading
                        label="Send"
                    />
                </Form>
            </div>
        );
    }
}