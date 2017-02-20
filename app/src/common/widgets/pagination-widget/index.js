import './style.scss';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as actions from './actions';

import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';


const PaginationWidget = (entityName, actionName) => {

    const mapStateToProps = state => {
        return ({
            pagination: state[entityName].pagination,
        });
    };

    const mapDispathToProps = dispath => {
        return ({
            action: bindActionCreators(actions, dispath),
        });
    };

    @connect(mapStateToProps, mapDispathToProps)
    class PaginationComponent extends React.Component {

     /*   componentWillMount() {
            debugger;
            this.setState({
                total: this.props.total,
                current: this.props.current,
                perPage: this.props.perPage,
            });
        }

        componentWillReceiveProps(nextProps) {
            this.setState({
                total: nextProps.total,
                current: nextProps.current,
                perPage: nextProps.perPage,
            });
        }*/

        render() {

            debugger;
            return (
                <div className="pagination-widget">
                    <div className="mdl-layout-spacer"></div>
                    <div className="pagination-widget__pager">
                        <span>Lines per page:</span>
                        <span className="pagination-widget__pager-per-page"></span>
                        <span className="pagination-widget__pager-start"></span>
                        <span>-</span>
                        <span className="pagination-widget__pager-end">20</span>
                        <span className="pagination-widget__pager-text widget-table__pager-text--narrow">of</span>
                        <span className="pagination-widget__pager-total"></span>
                        <span className="pagination-widget__pager-navigation">
                        <Button raised className="pagination-widget__pager-previous"><Icon
                            name="keyboard_arrow_left"/></Button>
                        <Button raised className="pagination-widget__pager-next"><Icon name="keyboard_arrow_right"/></Button>
                    </span>
                    </div>
                </div>
            )
        }
    }

    return new PaginationComponent;
};
module.exports.PaginationWidget = PaginationWidget;

/*export default function PaginationWidget(entityName, actionName) {

    const mapStateToProps = state => {
        return ({
            pagination: state[entityName].pagination,
        });
    };

    const mapDispathToProps = dispath => {
        return ({
            action: bindActionCreators(actions, dispath),
        });
    };

    @connect(mapStateToProps, mapDispathToProps)

    class PaginationComponent extends React.Component {

        componentWillMount() {
            debugger;
            this.setState({
                total: this.props.total,
                current: this.props.current,
                perPage: this.props.perPage,
            });
        }

        componentWillReceiveProps(nextProps) {
            this.setState({
                total: nextProps.total,
                current: nextProps.current,
                perPage: nextProps.perPage,
            });
        }

        handleArrowLeft() {
            this.props.action.paginationAction(actionName, 'dsfsdfsdf');
        }

        handleArrowRight() {
            this.props.action.paginationAction(actionName, 'dsfsdfsdf');
        }

        render() {

            debugger;
            return(
                <div className="pagination-widget">
                    <div className="mdl-layout-spacer"></div>
                    <div className="pagination-widget__pager">
                        <span>Lines per page:</span>
                        <span className="pagination-widget__pager-per-page">{this.state.perPage}</span>
                        <span className="pagination-widget__pager-start">{this.state.current}</span>
                        <span>-</span>
                        <span className="pagination-widget__pager-end">20</span>
                        <span className="pagination-widget__pager-text widget-table__pager-text--narrow">of</span>
                        <span className="pagination-widget__pager-total">{this.state.total}</span>
                        <span className="pagination-widget__pager-navigation">
                        <Button raised className="pagination-widget__pager-previous" onClick={this.handleArrowLeft}><Icon name="keyboard_arrow_left"/></Button>
                        <Button raised className="pagination-widget__pager-next" onClick={this.handleArrowRight}><Icon name="keyboard_arrow_right"/></Button>
                    </span>
                    </div>
                </div>
            )
        }
    }
    return new PaginationComponent();
}*/

