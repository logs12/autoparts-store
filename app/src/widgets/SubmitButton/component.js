import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default class SubmitButtonComponent extends Component {

    /**
     *
     * @type {{className: string, label: string, disabled: boolean }}
     */
    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string,
        disabled: React.PropTypes.bool,
    };

    render() {
        return (
            <div className={this.props.className}>
                <RaisedButton
                    primary
                    type="submit"
                    label={this.props.label}
                    icon={<CircularProgress size={0.3} />}
                    onTouchTap={this.submit}
                    disabled={this.props.disabled}
                />
            </div>
        );
    }
}