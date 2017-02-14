import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Form from '../../../../../common/widgets/form/container';
import {InputText} from '../../../../../common/widgets/input-text/container';
import ButtonLoading from '../../../../../common/widgets/button-loading/container';


import { USER_UPDATE_URL_REQUEST } from "../../../../../common/constants";

const mapToStateProps = (state, ownProps) => {
    return {
        userId: Number(ownProps.params.id),
        users: state.Users,
        user: _.find(state.Users, {id: Number(ownProps.params.id)}),
    }
};

@connect(mapToStateProps)
export default class UserForm extends Component {

    componentWillMount() {
        this.props;
    }

    render () {
        return (
            <div className="mdl-card mdl-shadow--2dp wide">
                <Form
                    actionName="UserUpdateAction"
                    formName="userForm"
                    model={this.props.user}
                    url={USER_UPDATE_URL_REQUEST(this.props.userId)}>
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
                            className="mdl-cell mdl-cell--6-col"
                        />
                        <InputText
                            name = 'email'
                            placeholder = 'Email'
                            className="mdl-cell mdl-cell--6-col"
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