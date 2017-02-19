import './styles.scss';

import React, { Component } from 'react';
import { Link } from 'react-router';



const NavLink = props => {


    //const {onClick , ...otherProps} = props;
    return(
        <Link { ...props } onClick={props.onClick} activeClassName='active' />
    )
};

export default NavLink;

/*
export default class NavLink extends Component {
    render() {
        return <Link {...this.props} activeClassName='active'/>
    }
}*/
