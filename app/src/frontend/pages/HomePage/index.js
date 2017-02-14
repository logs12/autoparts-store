import './style.scss';

import React, { Component } from 'react';


import Form from '../../../common/widgets/form/container';
import {InputText} from '../../../common/widgets/input-text/container';
import ButtonLoading from '../../../common/widgets/button-loading/container';

//components
import SearchForArticle from '../../containers/SearchForArticle';
import {actionFormDecorator} from '../../../common/widgets/form/decorators/@actionFormDecorator';
import ProgressBar from 'react-mdl/lib/ProgressBar';

export default class HomePage extends Component{
    
    /*constructor(props) {
        super(props);
        debugger;
        let ff = function f(n) {
            return n;
        };
        ff = actionFormDecorator(ff,'sdfsdf');
        let uu = ff(456);
    }*/

    render()  {
        return (
            <div id="home" >

                <SearchForArticle />
            </div>
        )
    }
};
