import "./styles/style.scss";
import React, {Component} from "react";

export default class Search extends Component {

    render () {
        return (
            <div className="search">
                <form className="search-form" action="" method="get">
                    <input  className="search-form__text"
                            type="text"
                            name="search_text"
                            placeholder="Поиск по артикулу" />
                    <button className="search-form__button"><i className="material-icons">search</i></button>
                </form>
            </div>
        )
    }
}

