import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogCallback extends Component {

    constructor (props) {
        super(props);
        this.state = {
            open: false
        }

    }

    handleOpen = () => {
        this.setState({open: true});
        console.log('entity = ', this.props.entity);
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        return (
            <div>
                <RaisedButton label="Заказать" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Dialog With Actions"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}