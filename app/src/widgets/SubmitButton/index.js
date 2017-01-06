import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';

export default class SubmitButton extends Component {

    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string
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
    
    submit() {
        
    }

    render() {
        return (
            <div className={this.props.className}>
                <RaisedButton
                    primary
                    type="submit"
                    label={this.props.label}
                    onTouchTap={this.submit} />
            </div>
        );
    }
}