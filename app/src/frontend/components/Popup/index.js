import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Popup extends Component {

    /**
     * Проверка типов переданных свойств
     * @type {{titleDialog: *, autoScrollBodyContent: *, modal: *}}
     */
    static propTypes = {
        /*titleDialog: React.PropTypes.string,
        autoScrollBodyContent: React.PropTypes.bool,
        modal: React.PropTypes.bool*/
    };

    /**
     * Дефолтные свойства
     * @type {{title: string, actions: *, modal: boolean, open: boolean}}
     */
    static defaultProps = {
        titleDialog: "Диалоговое окно",
        autoScrollBodyContent: false,
        modal: false
    };

    /**
     * Объект с состояниями
     * @type {{open: boolean}}
     */
    state = {
        open: this.props.open
    };

    constructor (props) {
        super(props);

    }

    getInitialState () {
        this.setState({open: this.props.open});
        console.log('this.state.open = ',this.state.open);
        console.log('this.props.open = ',this.props.open);
    }

    /**
     * Метод обработчик закрытия popup окна
     */
    handleClose = () => {
        this.setState({open: this.props.open});
    };

    render() {

        return (
            <Dialog
                title={this.props.titleDialog}
                actions={this.props.actions}
                modal={this.props.modal}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                    {this.props.children}
            </Dialog>
        );
    }
}