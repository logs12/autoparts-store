import React, {Component} from "react";

export default class SubmitButtonComponent extends Component {

    /**
     *
     * @type {{className: string, label: string, disabled: boolean }}
     */
    static propTypes = {
        className: React.PropTypes.string,
        label: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        isPending: React.PropTypes.bool,
    };

    spinner = <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i>;

    render() {
        return (
            <div className={this.props.className}>
                <button className="mdl-button mdl-js-button mdl-button--raised"
                        disabled={this.props.disabled}
                >
                    {this.props.isPending ? this.spinner : this.props.label}
                </button>
            </div>
        );
    }
}