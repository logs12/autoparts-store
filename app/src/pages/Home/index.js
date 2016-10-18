import './style.scss';

import React, { Component } from 'react';

//components
import SearchForArticle from '../../containers/SearchForArticle';

export default class Home extends Component{

    render()  {
        return (
            <div id="home" >
                <SearchForArticle />
            </div>
        )
    }
};
