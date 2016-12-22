import authAction from '../frontend/actions/AuthActions';

const ListActions = {
    authAction: authAction,
};

export default function action(nameAction, data) {
    if (ListActions[nameAction] != undefined) {
        return ListActions[nameAction](data);
    }
}