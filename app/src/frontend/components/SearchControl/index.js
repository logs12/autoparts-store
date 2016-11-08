import "./styles/style.scss";
import React, {Component} from "react";

import ProgressBar from '../../../widgets/ProgressBar';

export default class SearchControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };

    }

    /**
     * Обработчик изменения состояния в input
     * @param event
     */
    handleChangeSearchValue(event) {
        this.setState({searchValue: event.target.value});
    }

    render() {

        const {onClickButton, stateButton, pending, placeholder} = this.props;

        return (
            <div className="search-control">
                <div className="search-control__input-container">
                    <input  className="search-control__text"
                            type="text"
                            name="search_text"
                            placeholder={placeholder}
                            value={this.state.searchValue}
                            onChange={::this.handleChangeSearchValue}
                    />
                    <button className="search-control__button"
                            onClick={event => {
                                event.target.value = this.state.searchValue;
                                return onClickButton(event);
                            }}
                            {...stateButton}>
                        <i className="material-icons">search</i>
                    </button>
                </div>
                {pending ? <ProgressBar /> : false}
            </div>
        ) 
    }
}

