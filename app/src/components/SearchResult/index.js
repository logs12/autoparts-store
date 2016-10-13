import './styles/style.scss';


import React, {Component} from "react";
import DialogCallback from "../../components/DialogCallback";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';

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
                    <div className="content-grid mdl-grid" key={index}>
                        <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
                            {item.manufacturer} {item.articul}
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--4-col-phone">
                            {item.name}
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--4-col-phone">
                            {item.num} шт.
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell--4-col-phone">
                            {item.term} дн.
                        </div>
                        <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell--4-col-phone">
                            {item.price} руб.
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell--4-col-phone">
                            <DialogCallback />
                        </div>
                    </div>
                );
            }
        });
        return originalProducts;
    }

    render() {
        const style = {
            margin: 4,
            textAlign: 'center',
        };
        return(
            <MuiThemeProvider>
                <div className="search-result">
                        <Paper style={style} zDepth={1} >
                            <div className="search-result__header">
                                <div className="content-grid mdl-grid">
                                    <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet mdl-cell—hide-phone ">ПРОИЗВОДИТЕЛИ</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell—hide-phone ">НАИМЕНОВАНИЕ</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell—hide-phone  ">В НАЛИЧИИ</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet mdl-cell—hide-phone ">СРОК ОЖИДАНИЯ</div>
                                    <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet mdl-cell—hide-phone ">ЦЕНА</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet mdl-cell—hide-phone "></div>
                                </div>
                            </div>
                            <div className="search-result__container">
                                <div>ПРЕДЛОЖЕНИЯ ПО ОРИГИНАЛЬНЫМ ПРОИЗВОДИТЕЛЯМ</div>
                                {this.renderContentOriginal(this.props)}
                            </div>
                        </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

