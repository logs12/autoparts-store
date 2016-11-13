import './styles/style.scss';

import React, { Component } from 'react';
import NavLink from '../../frontend/components/NavLink';
import FlexMenuHandler from './FlexMenuHandler';


export default class FlexMenu extends Component {

    constructor(props, context) {
        super(props, context);
        this.links = this.props.links;
        new FlexMenuHandler();
    }

    componentDidMount() {
        $('nav.flex-menu').flexMenu();
    }

    render() {
        return (
            <nav className="flex-menu">
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