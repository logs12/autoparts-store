import "./styles/style.scss";
import React, {Component} from "react";

import { connect } from 'react-redux';
import * as SearchForArticulActions
    from '../../actions/SearchForArticulActions';
import ProgressBar from '../../widgets/ProgressBar';

export class SearchForArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };

    }

    render() {

        const {value, onChangeInput, onChangeInput, stateButton} = this.props;


        return (
            <div className="search-for-article">
                <div className="search-for-article__input-container">
                    <input  className="search-for-article__text"
                            type="text"
                            name="search_text"
                            placeholder="Поиск по артикулу"
                            value={this.state.searchValue}
                            onChange={e => onChangeInput(e.target.value)}
                    />
                    <button className="search-for-article__button"
                            onClick={this.handleClick.bind(this)}
                            {...stateButton}>
                        <i className="material-icons">search</i>
                    </button>
                </div>
                {pending ? <ProgressBar /> : false}
            </div>
        )
    }
}

