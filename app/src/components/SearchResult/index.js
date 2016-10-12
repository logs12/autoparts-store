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
                        <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet">
                            {item.manufacturer} {item.articul}
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet">
                            {item.name}
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet">
                            {item.num} шт.
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet">
                            {item.term} дн.
                        </div>
                        <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet">
                            {item.price} руб.
                        </div>
                        <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet">
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
                                    <div className="mdl-cell mdl-cell--3-col mdl-cell--2-col-tablet">ПРОИЗВОДИТЕЛИ</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--2-col-tablet">НАИМЕНОВАНИЕ</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet">В НАЛИЧИИ</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet">СРОК ОЖИДАНИЯ</div>
                                    <div className="mdl-cell mdl-cell--2-col mdl-cell--1-col-tablet">ЦЕНА</div>
                                    <div className="mdl-cell mdl-cell--1-col mdl-cell--1-col-tablet"></div>
                                </div>
                            </div>
                            <div className="search-result__container">
                                {this.renderContentOriginal(this.props)}
                            </div>
                        </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

