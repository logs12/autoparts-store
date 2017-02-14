import './style.scss';

import React, { Component } from 'react';

import ErrorWidget from '../../widgets/error/container';

const ErrorPage = () => {

    return (
        <div className="error-page">
            <ErrorWidget />
        </div>
    )
};

export default ErrorPage;
