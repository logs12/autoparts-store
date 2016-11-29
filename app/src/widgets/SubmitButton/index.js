import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';

export default class InputText extends Component {

    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string
    }

    static contextTypes =  {
        isFormValid: React.PropTypes.func.isRequired,
        submit: React.PropTypes.func.isRequired
    }

    /**
     * Дефолтные свойства
     * @type {{}}
     */
    static defaultProps = {
        label: 'Submit'
    }

    constructor (props) {
        super(props);

    }

    render() {
        return (
            <div className={this.props.className}>
                <RaisedButton
                    primary
                    disabled={!this.context.isFormValid()}
                    label={this.props.label}
                    onTouchTap={this.context.submit}/>
            </div>
        );
    }
}