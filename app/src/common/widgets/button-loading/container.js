import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {bindActionCreators} from "redux";

import ButtonLoadingComponent from './component';
import Spinner from 'react-mdl/lib/Spinner';
import { reset } from '../form/actions';

import {
    WIDGET_FORM_INIT,
    WIDGET_FORM_REQUEST,
    WIDGET_FORM_SUCCESS,
    WIDGET_FORM_ERROR
} from '../../constants';



const mapStateToProps = (state) => {
    return ({
        FormWidgets: state.FormWidget
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        resetForm: bindActionCreators(reset, dispatch),
        dispatch: dispatch
    });
};

/**
 * Подключение к reduxStore
 */
@connect(mapStateToProps, mapDispatchToProps)

/**
 * Виджет можно использовать независимо от формы, но в таком случае необходимо явно прописывать название reducer
 * в глобальном state в свойстве reducerName, которому принадлежат данные
    <ButtonLoading
        label = 'Send'
        reducerName = 'entity'
    />
 */

export default class ButtonLoading extends Component{

    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        backToListUrl: PropTypes.string,
        //saveAndBackToList: PropTypes.string,
        //saveAndMore: PropTypes.string,
        type: PropTypes.string,
    };

    /**
     * Дефолтные свойства
     * @type {{}}
     */
    static defaultProps = {
        reducerName: 'FormWidgets',
        label: 'Submit',
        className: '',
        backToListUrl: '/',
        type: 'default',
    };

    /**
     * Свойство выключения кнопки
     * @type {{disabled: boolean, isPending: boolean, buttonState, typeButton: null}}
     */
    state = {
        disabled: true,
        isPending: false,
        buttonState: WIDGET_FORM_INIT,
        typeButton: null,
    };

    /**
     * Инициализируем контроль типов свойств контекста
     * @type {{formName: *, isPending: RegExp}}
     */
    static contextTypes = {
        formName: React.PropTypes.string.isRequired,
    };

    successElement = <div className="widget-button-loading__success-text widget-button-loading__success-text--icon mdl-color-text--green-600">
        <i className="material-icons">done</i>
    </div>;

    errorElement = <div className="widget-button-loading__error-text widget-button-loading__error-text--icon mdl-color-text--red-600">
        <i className="material-icons">error</i>
    </div>;

    stateElement = null;

    /**
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {

        // Если isChanged == true, то выключаем кнопку disabled == false
        this.state.disabled = !nextProps[this.props.reducerName][this.context.formName].isChanged;

        // Состояния кнопки
        this.state.buttonState = nextProps[this.props.reducerName][this.context.formName].stateForm;

        this.stateButton(this.state.buttonState);
    }



    /**
     * Визуализация состояния кнопки
     * @returns {*}
     */
    stateButton(buttonState) {

        switch (buttonState) {
            case WIDGET_FORM_REQUEST: {

                switch (this.state.typeButton) {
                    case 'saveAndBackToList': {
                        this.stateElement = <Spinner />;
                        break;
                    }
                    case 'saveAndMore': {
                        this.stateElement = <Spinner />;
                        break;
                    }
                    case 'default': {
                        this.stateElement = <Spinner />;
                        break;
                    }
                }
                break;
            }
            case WIDGET_FORM_SUCCESS: {
                switch (this.state.typeButton) {
                    case 'saveAndBackToList': {
                        this.props.dispatch(push(this.props.backToListUrl));
                        this.stateElement = null;
                        this.setState({typeButton: null});
                        break;
                    }
                    case 'saveAndMore': {
                        this.props.resetForm(
                            this.context.formName,
                            this.props.FormWidgets[this.context.formName]
                        );
                        this.props.dispatch(push(this.props.backToListUrl));
                        this.stateElement = this.successElement;

                        this.setState({typeButton: null});
                        break;
                    }
                    case 'default': {
                        this.stateElement = this.successElement;

                        this.setState({typeButton: null});
                        break;
                    }
                }
                break;
            }
            case WIDGET_FORM_ERROR: {
                switch (this.state.typeButton) {
                    case 'saveAndBackToList': {
                        this.stateElement = this.errorElement;
                        this.setState({typeButton: null});
                        break;
                    }
                    case 'saveAndMore': {
                        this.stateElement = this.errorElement;
                        this.setState({typeButton: null});
                        break;
                    }
                    case 'default': {
                        this.stateElement = this.errorElement;
                        this.setState({typeButton: null});
                        break;
                    }
                }
                break;
            }
        }

    }

    handleClickButton() {
        this.setState({
            typeButton: this.props.type,
        });
    }

    render () {
        return (
            <ButtonLoadingComponent
                className={this.props.className}
                label={this.props.label}
                disabled={this.state.disabled}
                stateElement={this.stateElement}
                type={this.props.type}
                handleClickButton={::this.handleClickButton}
            >
            </ButtonLoadingComponent>
        )
    }
}