import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";

import { paginationAction } from './actions';

import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';

import configureStore from '../../store/ConfigureStore';
const store = configureStore();

export default function PaginationWidget(entityName, actionName, paginationUrl) {
    
    const mapStateToProps = (state) => {
        return ({
            pagination: state[entityName].pagination,
            routing: state.routing,
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

        state = {
            total: this.props.pagination.total,
            current: this.props.pagination.current,
            perPage: this.props.pagination.perPage,
            pagerButtonPrevious: '',
            pagerButtonNextState: 'disabled',
        };

        componentWillMount() {
            this.props;
            /*this.setState({
                total: this.props.pagination.total,
                current: this.props.pagination.current,
                perPage: this.props.pagination.perPage,

            });*/
        }

        componentWillReceiveProps(nextProps) {
            this.setState({
                total: nextProps.pagination.total,
                current: nextProps.pagination.current,
                perPage: nextProps.pagination.perPage,
            });
        }

        handleArrowLeft() {
            debugger;
            this.props.push(`${paginationUrl}?page=2`);
            //this.props.paginationAction(actionName, 'sdf');
        }

        handleArrowRight() {
            this.props.paginationAction(actionName, 'dsfsdfsdf');
        }

        render() {
            return(
                <div className="pagination-widget">
                    <div className="mdl-layout-spacer"></div>
                    <div className="pagination-widget__pager">
                        <span>Lines per page:</span>
                        <span className="pagination-widget__pager-per-page">{this.state.perPage}</span>
                        <span className="pagination-widget__pager-start">{this.state.current}</span>
                        <span> - </span>
                        <span className="pagination-widget__pager-end">20</span>
                        <span className="pagination-widget__pager-text widget-table__pager-text--narrow">of</span>
                        <span className="pagination-widget__pager-total">{this.state.total}</span>
                        <span className="pagination-widget__pager-navigation">
                        <Button raised
                                className="pagination-widget__pager-previous" onClick={::this.handleArrowLeft}
                                disabled={this.state.pagerButtonPrevious}>
                            <Icon name="keyboard_arrow_left"/>
                        </Button>
                        <Button raised
                                className="pagination-widget__pager-next" onClick={::this.handleArrowRight}
                                disabled={this.state.pagerButtonNextState}>
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
