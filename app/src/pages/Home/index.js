import './style.scss';

import React, { Component } from 'react';

//components
import Search from '../../containers/Search';

export default class Home extends Component{

    render()  {

        return (
            <div id="home" >
                <Search />
            </div>
        )
    }
};
