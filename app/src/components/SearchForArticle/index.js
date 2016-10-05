import "./styles/style.scss";
import React, {Component} from "react";

import ProgressBar from '../../widgets/ProgressBar';

export class SearchForArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };

    }

    render() {

        const {value, onChangeInput, onClickButton, stateButton, pending} = this.props;


        return (
            <div className="search-for-article">
                <div className="search-for-article__input-container">
                    <input  className="search-for-article__text"
                            type="text"
                            name="search_text"
                            placeholder="Поиск по артикулу"
                            value={value}
                            onChange={event => onChangeInput(event.target.value)}
                    />
                    <button className="search-for-article__button"
                            onClick={event => onClickButton(event.target.value)}
                            {stateButton}>
                        <i className="material-icons">search</i>
                    </button>
                </div>
                {pending ? <ProgressBar /> : false}
            </div>
        )
    }
}

