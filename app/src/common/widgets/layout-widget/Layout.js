import React, { PropTypes } from 'react';
import classNames from 'classnames';
import mdlUpgrade from 'react-mdl/lib/utils/mdlUpgrade';

const propTypes = {
    className: PropTypes.string,
    fixedDrawer: PropTypes.bool,
    fixedHeader: PropTypes.bool,
    fixedTabs: PropTypes.bool,
    clickMenuItem: PropTypes.bool,
};

// eslint-disable-next-line react/prefer-stateless-function
class Layout extends React.Component {

    render() {
        const { className, fixedDrawer, fixedHeader, fixedTabs, clickMenuItem, ...otherProps } = this.props;

        const classes = classNames('mdl-layout mdl-js-layout', {
            'mdl-layout--fixed-drawer': fixedDrawer,
            'mdl-layout--fixed-header': fixedHeader,
            'mdl-layout--fixed-tabs': fixedTabs
        }, className);

        // При собитии клика(перехода) по боковому меню закрываем drawer(боковую панель)
        if (clickMenuItem) {
            this.innerContainer.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible');
            this.innerContainer.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible');
        }

        return (
            <div className={classes} {...otherProps}>
                <div className="mdl-layout__inner-container" ref={(innerContainer) => {this.innerContainer = innerContainer}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Layout.propTypes = propTypes;

export default mdlUpgrade(Layout, true);
