import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";

import PaginationComponent from './component';

/**
 * 
 * @param entityName - name entity or collections
 * @param paginationUrl - url for request server
 * @returns {*}
 * @constructor
 */
export default function PaginationWidget(entityName, paginationUrl) {

    const mapStateToProps = (state) => {
        return ({
            entityName: entityName,
            collection: state[entityName].collection,
            pagination: state[entityName].pagination,
            paginationUrl: paginationUrl,
        });
    };

    const mapDispatchToProps = dispatch => {
        return ({
            push: bindActionCreators(push, dispatch),
        });
    };

    return connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
}
