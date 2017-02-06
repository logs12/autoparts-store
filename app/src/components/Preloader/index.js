import './style.scss';

import React from 'react';

const Preloader = () => {
    return (
        <div data-layout="preload" className="mdl-color--grey-900 mdl-color-text--white">
            <div className="layout mdl-layout mdl-js-layout">
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