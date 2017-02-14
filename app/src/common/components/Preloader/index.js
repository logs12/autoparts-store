import './style.scss';

import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader mdl-color-text--white">
            <div className="layout mdl-layout mdl-js-layout mdl-color--grey-900">
                <main className="mdl-layout__content">
                    <div className="preload-layout__preloader-content">
                            <h1>APPLICATION</h1>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Preloader;