import { createSelector } from 'reselect';
import _ from 'lodash';

const usersSelector = state => state.users;

const selectedUsersSelector = state => state.selectedUserIds;

const getUsers = (users, selectedUserIds) => {
    const selectedUsers = _.filter(
        users,
        user => _.contains(selectedUserIds, user.id),
    );

    return selectedUsers;
};

export default createSelector(
    usersSelector,
    selectedUsersSelector,
    getUsers,
);
