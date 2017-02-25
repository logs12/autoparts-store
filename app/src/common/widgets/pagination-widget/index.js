import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";

import { paginationAction } from './actions';

import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';

export default function PaginationWidget(entityName, actionName, paginationUrl) {
    
    const mapStateToProps = (state) => {
        return ({
            collection: state[entityName].collection,
            pagination: state[entityName].pagination,
            pathname: state.routing.locationBeforeTransitions.pathname,
        });
    };

    const mapDispatchToProps = dispatch => {
        return ({
            paginationAction: bindActionCreators(paginationAction, dispatch),
            push: bindActionCreators(push, dispatch),
        });
    };

    @connect(mapStateToProps, mapDispatchToProps)

    class PaginationComponent extends Component {

        startValue = 0;
        endValue = 0;
        pagerButtonPrevious = 'disabled';
        pagerButtonNextState = '';

        handleArrowLeft() {
            debugger;
            let current = parseInt(this.props.pagination.current);
            current = --current;
            this.calculationPaging(this.props.pagination, current);
        }

        handleArrowRight() {
            debugger;
            let current = parseInt(this.props.pagination.current);
            current = ++current;
            this.props.push(`${paginationUrl}?page=${current}`);
            this.props.paginationAction(actionName, {condition: `?page=${current}`});

            this.calculationPaging(this.props.pagination, current);
        }

        calculationPaging(pagination, current) {

            // Расчет начального состояния
            this.startValue = pagination.perPage * (current - 1);
            if (this.props.collection.length) {
                this.startValue++;
            } else {
                this.startValue = 0;
            }


            // Расчёт конечного значения
            this.endValue = pagination.perPage * current;
            this.endValue = this.endValue > pagination.total ? pagination.total : this.endValue;

            // Кнопка перехода на предыдущую страницу
            if (current <= 1) {
                this.pagerButtonPrevious = 'disabled';
                this.pagerButtonNextState = '';
            }

            // Кнопка перехода на следующую страницу
            let maxPage = Math.ceil(pagination.total / pagination.perPage);
            if (current >= maxPage) {
                this.pagerButtonPrevious = '';
                this.pagerButtonNextState = 'disabled';
            }
        }

        render() {
            const {perPage,total} = this.props.pagination;

            debugger;
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
    return PaginationComponent;
}
