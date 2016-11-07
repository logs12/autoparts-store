import './styles/style.scss';

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import DialogCallback from "../../components/DialogCallback";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Paper from 'material-ui/Paper';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        console.log('props!!!! = ',this.props);

    }

    renderContent(props, typeProduct, title) {

        const content = [
            <div key = {0}
                 className="search-result__title"
                ref={(c) => this.title = c}>
                {title}
            </div>
        ];

        const products = props.data.map((item, index) => {
            if (item.group == typeProduct) {
                return (
                    <div className="search-result__content mdl-grid" key={index + 1}>
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
                            <DialogCallback  />
                        </div>
                    </div>
                );
            }
        });

        return <div className="search-result__container-item">{content.concat(products)}</div>;
    }

    componentDidMount() {

        let title = $('.search-result__title');
        let top = [];
        title.each((index, value) => {
            top.push({
                element: value,
                top: $(value).offset().top
            });
        });
        $('main').on('scroll', function(event){
            top.forEach((titleElement) => {
                if ($('main').scrollTop() > titleElement.top) {
                    $('.search-result__title').removeClass('search-result__title--fixed');
                    $(titleElement.element).addClass('search-result__title--fixed');
                } else if ($('main').scrollTop() < titleElement.top){
                    $(titleElement.element).removeClass('search-result__title--fixed');
                }
            });
        });
    }

    fixed

    render() {
        const style = {
            margin: 4,
            textAlign: 'center',
        };
        return(
            <MuiThemeProvider>
                <div className="search-result" >
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
                                {this.renderContent(
                                    this.props,
                                    'Original',
                                    'ПРЕДЛОЖЕНИЯ ПО ОРИГИНАЛЬНЫМ ПРОИЗВОДИТЕЛЯМ'
                                )}
                                {this.renderContent(
                                    this.props,
                                    'ReplacementOriginal',
                                    'ПРЕДЛОЖЕНИЯ ПО ОРИГИНАЛЬНЫМ ЗАМЕНАМ'
                                )}
                                {this.renderContent(
                                    this.props,
                                    'ReplacementNonOriginal',
                                    'ПРЕДЛОЖЕНИЯ ПО НЕОРИГИНАЛЬНЫМ ЗАМЕНАМ'
                                )}
                            </div>
                        </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

