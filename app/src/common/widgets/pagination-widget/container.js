import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";

import { paginationAction } from './actions';
import PaginationComponent from './component';

import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';

export default function PaginationWidget(entityName, actionName, paginationUrl) {

    const mapStateToProps = (state) => {
        return ({
            collection: state[entityName].collection,
            pagination: state[entityName].pagination,
            pathname: state.routing.locationBeforeTransitions.pathname,
            actionName: actionName,
            paginationUrl: paginationUrl,
        });
    };

    const mapDispatchToProps = dispatch => {
        return ({
            paginationAction: bindActionCreators(paginationAction, dispatch),
            push: bindActionCreators(push, dispatch),
        });
    };

    return connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
}
