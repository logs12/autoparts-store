import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../../../widgets/form/container';
import {InputText} from '../../../../../widgets/input-text/container';
import ButtonLoading from '../../../../../widgets/button-loading/container';


import { USER_URL_REQUEST } from "../../../../../constants";


export default class UserForm extends Component {

    render () {
        return (
            <div className="mdl-card mdl-shadow--2dp wide">
                <Form
                    actionName="userAction"
                    formName="userForm"
                    url={USER_URL_REQUEST} >
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