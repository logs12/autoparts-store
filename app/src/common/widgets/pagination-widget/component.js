import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";


import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';


export default class PaginationComponent extends Component {

    startValue = 0;
    endValue = 0;
    current = parseInt(this.props.pagination.current);
    pagerButtonPrevious = 'disabled';
    pagerButtonNextState = '';

    componentWillMount() {

        debugger;

        this.calculationPaging(this.props.pagination);
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        //this.calculationPaging(nextProps.pagination);
    }

    handleArrowLeft() {
        this.current = --this.current;
        this.props.push(`${this.props.paginationUrl}?page=${this.current}`);
        this.props.paginationAction(this.props.actionName, {condition: `?page=${this.current}`});
    }

    handleArrowRight() {
        this.current = ++this.current;
        this.props.push(`${this.props.paginationUrl}?page=${this.current}`);
        this.props.paginationAction(this.props.actionName, {condition: `?page=${this.current}`});
    }

    calculationPaging(pagination) {

        debugger;

        // Расчет начального состояния
        this.startValue = pagination.perPage * (this.current - 1);
        if (this.props.collection.length) {
            this.startValue++;
        } else {
            this.startValue = 0;
        }


        // Расчёт конечного значения
        this.endValue = pagination.perPage * this.current;
        this.endValue = this.endValue > pagination.total ? pagination.total : this.endValue;

        // Кнопка перехода на предыдущую страницу
        if (this.current <= 1) {
            this.pagerButtonPrevious = 'disabled';
            this.pagerButtonNextState = '';
        }

        // Кнопка перехода на следующую страницу
        let maxPage = Math.ceil(pagination.total / pagination.perPage);
        if (this.current >= maxPage) {
            this.pagerButtonPrevious = '';
            this.pagerButtonNextState = 'disabled';
        }
    }

    render() {
        const {perPage,total} = this.props.pagination;

        return(
            <div className="pagination-widget">
                <div className="mdl-layout-spacer"></div>
                <div className="pagination-widget__pager">
                    <span>Lines per page:</span>
                    <span className="pagination-widget__pager-per-page">{perPage}</span>
                    <span className="pagination-widget__pager-start">{this.startValue}</span>
                    <span> - </span>
                    <span className="pagination-widget__pager-end">{this.endValue}</span>
                    <span className="pagination-widget__pager-text widget-table__pager-text--narrow">of</span>
                    <span className="pagination-widget__pager-total">{total}</span>
                    <span className="pagination-widget__pager-navigation">
                    <Button raised
                            className="pagination-widget__pager-previous" onClick={::this.handleArrowLeft}
                            disabled={this.pagerButtonPrevious}>
                        <Icon name="keyboard_arrow_left"/>
                    </Button>
                    <Button raised
                            className="pagination-widget__pager-next" onClick={::this.handleArrowRight}
                            disabled={this.pagerButtonNextState}>
                        <Icon name="keyboard_arrow_right"/>
                    </Button>
                </span>
                </div>
            </div>
        )
    }
}
