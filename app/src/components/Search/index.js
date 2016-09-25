import "./styles/style.scss";
import React, {Component} from "react";

import { connect } from 'react-redux';

export default class Search extends Component {

    constructor() {
        super();
    }

    handleClick() {
        
    }

    render() {
        return (
            <div className="search">
                <form className="search-form" action="" method="get">
                    <input  className="search-form__text"
                            type="text"
                            name="search_text"
                            placeholder="Поиск по артикулу" />
                    <button className="search-form__button"
                            onClick={this.handleClick}>
                        <i className="material-icons">search</i>
                    </button>
                </form>
            </div>
        )
    }
}

