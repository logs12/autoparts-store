import React, {Component} from "react";
import TextField from 'material-ui/TextField';

export default class InputText extends Component {

    /**
     * Инициализируем контроль типов свойств
     * @type {{name: *, placeholder: *, label: *}}
     */
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        label: React.PropTypes.string
    };

    /**
     * Инициализируем контроль типов контекста
     * @type {{update: *, values: *, registerValidation: *}}
     */
    static contextTypes = {
        update: React.PropTypes.func.isRequired,
        values: React.PropTypes.object.isRequired,
        registerValidation: React.PropTypes.func.isRequired
    };

    /**
     * Инициализируем состояния
     * @type {{errors: Array}}
     */
    state = {
        errors: []
    };

    constructor (props) {
        super(props);

        console.log('this.context = ',this.props.name);
    }

    /**
     * При инициализации компонента удал
     */
    componentWillMount() {
        this.removeValidationFromContext = this.context.registerValidation(show =>
            this.isValid(show));
    }

    componentWillUnmount() {
        this.removeValidationFromContext();
    }

    updateValue(value) {
        this.context.update(this.props.name, value);

        if (this.state.errors.length) {
            setTimeout(() => this.isValid(true), 0);
        }
    }

    onChange(event) {
        this.updateValue(event.target.value)
    }

    isValid(showErrors) {
        /*const errors = this.props.validate
            .reduce((memo, currentName) =>
                memo.concat(validators[currentName](
                    this.context.values[this.props.name]
                )), []);

        if (showErrors) {
            this.setState({
                errors
            });
        }
        return !errors.length;*/
        return true;
    }

    onBlur() {
        this.isValid(true);
    }

    render() {
        return (
            <div>
                <TextField
                    name={this.props.name}
                    hintText={this.props.placeholder}
                    floatingLabelText={this.props.label}
                    value={this.props.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}/>
            </div>
        );
    }
}