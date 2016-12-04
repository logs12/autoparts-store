import './style.scss';

import React, { Component } from 'react';

import InputText from '../../../widgets/InputText/container';

//components
import SearchForArticle from '../../containers/SearchForArticle';

export default class Home extends Component{

    render()  {
        return (
            <div id="home" >

                <InputText />
                
                <SearchForArticle />
            </div>
        )
    }
};
