import "./styles/style.scss";
import React, {Component} from "react";

import { connect } from 'react-redux';
import * as SearchForArticulActions
    from '../../actions/SearchForArticulActions';
import ProgressBar from '../../widgets/ProgressBar';

export class Search extends Component {

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

    /**
     * Обработчик кнопки поиска, отправка введеного значения в store
     */
    handleClick(event) {
        event.preventDefault();
        this.props.dispatch(
            SearchForArticulActions.getProducts(this.state.searchValue)
        );
        this.pending = this.props.pending;
        this.action = this.props.action;
        this.reduxState = this.props.reduxState;
    }

    /**
     * Привязываем обработчики mdl компонентов
     */
    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    render() {
        let {pending,action,reduxState} = this.props;
        let stateButton = {};
        
        if (pending) {
            stateButton = {disabled : true};
        }
        console.log('this.props = ',this.props);
        return (
            <div className="search">
                <form className="search-form" action="" method="get">
                    <input  className="search-form__text"
                            type="text"
                            name="search_text"
                            placeholder="Поиск по артикулу"
                            value={this.state.searchValue}
                            onChange={this.handleChangeSearchValue.bind(this)}
                    />
                    <button className="search-form__button"
                            onClick={this.handleClick.bind(this)}
                            {...stateButton}>
                        <i className="material-icons">search</i>
                    </button>
                </form>
                {pending ? <ProgressBar /> : false}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pending: state.SearchForArticul.pending,
        products: state.SearchForArticul.products,
        reduxState: state
    }
};

const ConnectedHome = connect(mapStateToProps)(Search);

export default ConnectedHome;

