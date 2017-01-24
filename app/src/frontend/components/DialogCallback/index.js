import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

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