import "./styles/style.scss";
import React, {Component} from "react";
import SearchControl from "../../components/SearchControl";
import SearchResult from "../../components/SearchResult";

import { connect } from 'react-redux';
import * as SearchForArticulActions
    from '../../actions/SearchForArticulActions';

export class SearchForArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
        this.onClickButton = this.onClickButton.bind(this);
    }

    /**
     * Обработчик кнопки поиска, отправка введеного значения в store
     */
    onClickButton(event) {

        event.preventDefault();

        // Передаем в редьюсер артикул детали для поиска
        this.props.dispatch(
            SearchForArticulActions.getProducts(event.target.value)
        );

        this.pending = this.props.pending;
        this.action = this.props.action;
    }

    /**
     * Привязываем обработчики mdl компонентов
     */
    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps = ',nextProps);
    }

    render() {
        let {pending, products} = this.props;
        let stateButton = {};

        if (pending) {
            stateButton = {disabled : true};
        }

        // Если процесс поиска завершен, то показываем компонент результата
        let searchResult;
        if (pending == false) {
            searchResult = <SearchResult data={products.item} />;
        }

        return (
            <div className="search">
                <SearchControl
                    placeholder="Поиск по артикулу"
                    onClickButton={this.onClickButton}
                    stateButton={stateButton}
                    pending={pending}/>
                {searchResult}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pending: state.SearchForArticul.pending,
        products: state.SearchForArticul.products,
    }
};

const ConnectedHome = connect(mapStateToProps)(SearchForArticle);

export default ConnectedHome;

