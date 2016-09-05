import './style.scss';

import React, { Component } from 'react';

//components
import Search from '../../components/Search';

export default class Home extends Component{

    render()  {

        return (
            <div id="home" >
                <Search />
            </div>
        )
    }
};
