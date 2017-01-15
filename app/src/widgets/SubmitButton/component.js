import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class SubmitButton extends Component {

    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string
    };

    /**
     * Дефолтные свойства
     * @type {{}}
     */
    static defaultProps = {
        label: 'Submit'
    };

    constructor (props) {
        super(props);

    }


    render() {
        return (
            <div className={this.props.className}>
                <RaisedButton
                    primary
                    type="submit"
                    label={this.props.label}
                    icon={<CircularProgress size={0.3} />}
                    onTouchTap={this.submit} />
            </div>
        );
    }
}