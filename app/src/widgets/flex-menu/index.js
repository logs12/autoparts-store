import './styles/style.scss';

import React, { Component } from 'react';
import NavLink from '../nav-link/component';
import FlexMenuHandler from './FlexMenuHandler';


export default class FlexMenu extends Component {

    constructor(props, context) {
        super(props, context);
        this.links = this.props.links;
        new FlexMenuHandler();
    }

    componentDidMount() {
        $(this.flexMenuNav).flexMenu({
            'threshold' : 2, // [integer] If there are this many items or fewer in the list, we will not display a "View More" link and will instead let the list break to the next line. This is useful in cases where adding a "view more" link would actually cause more things to break  to the next line.
            'cutoff' : 2, // [integer] If there is space for this many or fewer items outside our "more" popup, just move everything into the more menu. In that case, also use linkTextAll and linkTitleAll instead of linkText and linkTitle. To disable this feature, just set this value to 0.
            'linkText' : 'More', // [string] What text should we display on the "view more" link?
            'linkTitle' : 'View More', // [string] What should the title of the "view more" button be?
            'linkTextAll' : 'Меню', // [string] If we hit the cutoff, what text should we display on the "view more" link?
            'linkTitleAll' : 'Open/Close Menu', // [string] If we hit the cutoff, what should the title of the "view more" button be?
            'showOnHover' : true, // [boolean] Should we we show the menu on hover? If not, we'll require a click. If we're on a touch device - or if Modernizr is not available - we'll ignore this setting and only show the menu on click. The reason for this is that touch devices emulate hover events in unpredictable ways, causing some taps to do nothing.
            'popupAbsolute' : true, // [boolean] Should we absolutely position the popup? Usually this is a good idea. That way, the popup can appear over other content and spill outside a parent that has overflow: hidden set. If you want to do something different from this in CSS, just set this option to false.
            'popupClass' : '', // [string] If this is set, this class will be added to the popup
            'undo' : false // [boolean] Move the list items back to where they were before, and remove the "View More" link.
        });
    }

    render() {
        return (
            <nav className="flex-menu" ref={(nav) => {this.flexMenuNav = nav;}}>
                {this.links.map((link, index) => {
                    return (
                        <li key={index}>
                            <NavLink
                                onlyActiveOnIndex={true}
                                to={link.url}>
                                {link.title}
                            </NavLink>
                        </li>
                    )
                })}
            </nav>
        )
    }
}