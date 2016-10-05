import "./styles/style.scss";
import React, {Component} from "react";

import { connect } from 'react-redux';
import * as SearchForArticulActions
    from '../../actions/SearchForArticulActions';

export class SearchForArticle extends Component {

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
                <SearchForArticle
                    value={this.state.searchValue}
                    onChangeInput={this.handleChangeSearchValue.bind(this)}
                    onClickButton={this.handleClick.bind(this)}
                    stateButton={...stateButton}/>
                <SearchResultsForArticle />
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

const ConnectedHome = connect(mapStateToProps)(SearchForArticle);

export default ConnectedHome;

