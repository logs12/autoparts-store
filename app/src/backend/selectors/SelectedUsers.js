import { createSelector } from 'reselect';
import _ from 'lodash';

const usersSelector = state => state.users;

const selectedUsersSelector = state => state.selectedUserIds;

const getUsers = (users, selectedUserIds) => {
    return _.filter(
        users,
        user => _.includes(selectedUserIds, user.id),
    );
};

export default createSelector(
    usersSelector,
    selectedUsersSelector,
    getUsers,
);
