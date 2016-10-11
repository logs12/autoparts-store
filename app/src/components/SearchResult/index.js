import './styles/style.scss';


import React, {Component} from "react";
import DialogCallback from "../../components/DialogCallback";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        console.log('props!!!! = ',this.props);

    }

    renderContentOriginal(props) {
        let originalProducts = props.data.map((item, index) => {
            if (item.group == 'Original') {
                return (
                    <div className="search-result__row" key={index}>
                        <div className="search-result__col">
                            {item.manufacturer} {item.articul}
                        </div>
                        <div className="search-result__col">
                            {item.name}
                        </div>
                        <div className="search-result__col">
                            {item.num} шт.
                        </div>
                        <div className="search-result__col">
                            {item.term} дн.
                        </div>
                        <div className="search-result__col">
                            {item.price} руб.
                            <MuiThemeProvider>
                                <DialogCallback />
                            </MuiThemeProvider>
                        </div>
                    </div>
                );
            }
        });
        return originalProducts;
    }

    render() {
        return(
            <div className="search-result">
                <div className="search-result__header">
                    <div className="search-result__row ">
                        <div className="search-result__col">ПРОИЗВОДИТЕЛИ</div>
                        <div className="search-result__col">НАИМЕНОВАНИЕ</div>
                        <div className="search-result__col">В НАЛИЧИИ</div>
                        <div className="search-result__col">СРОК ОЖИДАНИЯ</div>
                        <div className="search-result__col">ЦЕНА</div>
                    </div>
                </div>
                <div className="search-result__container">
                    {this.renderContentOriginal(this.props)}
                </div>
            </div>
        )
    }
}

