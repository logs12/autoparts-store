import React, { Component } from 'react';

const noop = () => undefined;

export default class Form extends Component {

    static propTypes = {
        children: React.PropTypes.node,
        values: React.PropTypes.object,
        update: React.PropTypes.func,
        reset: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    };


    static childContextTypes = {
        update: React.PropTypes.func,
        reset: React.PropTypes.func,
        submit: React.PropTypes.func,
        values: React.PropTypes.object,
        registerValidation: React.PropTypes.func,
        isFormValid: React.PropTypes.func,
    };

    static defaultProps = {
        onSubmit: noop
    };

    validations = [];

    constructor (props) {
        super(props);
    }

    registerValidation(isValidFunc) {
        this.validations = [...this.validations, isValidFunc];
        return this.removeValidation.bind(null, isValidFunc);
    }

    /**
     * Удаление валидации
     * @param ref
     */
    removeValidation(ref) {
        this.validations = this.validations.splice(ref,1);
    }

    isFormValid(showErrors) {
        return this.validations.reduce((memo, isValidFunc) => isValidFunc(showErrors) && memo, true);
    }

    submit(){
        if (this.isFormValid(true)) {
            this.props.onSubmit({ ...this.props.values });
            this.props.reset();
        }
    }

    getChildContext() {
        return {
            update: this.props.update,
            reset: this.props.reset,
            submit: this.submit,
            values: this.props.values,
            registerValidation: this.registerValidation.bind(this),
            isFormValid: this.isFormValid.bind(this)
        };
    }

    render() {
        debugger;
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
}