// Constants widget-form
export const WIDGET_FORM_INIT = 'WIDGET_FORM_INIT';
export const WIDGET_FORM_REQUEST = 'WIDGET_FORM_REQUEST';
export const WIDGET_FORM_SUCCESS = 'WIDGET_FORM_SUCCESS';
export const WIDGET_FORM_ERROR = 'WIDGET_FORM_ERROR';
export const WIDGET_FORM_RESET = 'WIDGET_FORM_RESET';

// Constants widget-input-text
export const WIDGET_INPUT_TEXT_ACTION_NAME = 'updateInputText';
export const WIDGET_INPUT_TEXT_UPDATE_VALUE = 'UPDATE_VALUE';

// Constants widget-error
export const WIDGET_SERVER_ERROR = 'WIDGET_SERVER_ERROR';
export const WIDGET_CLIENT_ERROR = 'WIDGET_CLIENT_ERROR';

// Constants progress-bar-widget
export const PROGRESS_BAR_WIDGET_START = 'PROGRESS_BAR_WIDGET_START';
export const PROGRESS_BAR_WIDGET_STOP = 'PROGRESS_BAR_WIDGET_STOP';

// Constants Аuthorization
export const LOGIN_WIDGET_FORM_REQUEST = 'LOGIN_WIDGET_FORM_REQUEST';
export const LOGIN_WIDGET_FORM_SUCCESS = 'LOGIN_WIDGET_FORM_SUCCESS';
export const LOGIN_WIDGET_FORM_ERROR = 'LOGIN_WIDGET_FORM_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const CONFIG_DATA_GET = 'CONFIG_DATA_GET';

//========== /Constants Pagination ==========//
export const PAGINATION_GET = 'PAGINATION_GET';


//========== /Constants Users ==========//
export const USERS_GET = 'USERS_GET';
export const USER_VIEW = 'USER_VIEW';
export const USER_CREATE = 'USER_CREATE';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_DELETE = 'DELETE';


//========== /Constants react-redux-router app ==========//
export const ADMIN_ROUTE = '/admin';
export const DASHBOARD_ROUTE = '/admin/dashboard';
export const USERS_ROLES_ROUTE = '/admin/users-roles';
export const USERS_ROUTE = '/admin/users-roles/users';
export const USER_CREATE_ROUTE = '/admin/users-roles/user/create';
export const USER_VIEW_ROUTE = id => `/admin/users-roles/user/${id}`;
export const USER_UPDATE_ROUTE = id => `/admin/users-roles/user/update/${id}`;
export const USER_DELETE_ROUTE = id => `/admin/users-roles/user/delete/${id}`;
export const USER_WIDGET_FORM_REQUEST = 'USER_WIDGET_FORM_REQUEST';
export const USER_WIDGET_FORM_SUCCESS = 'USER_WIDGET_FORM_SUCCESS';
export const USER_WIDGET_FORM_ERROR = 'USER_WIDGET_FORM_ERROR';

export const LOGIN_ROUTE = '/login';
export const ERROR_ROUTE = '/error';


// Constants url request
export const LOGIN_URL_REQUEST = '/api-internal/login';
export const LOGOUT_URL_REQUEST = '/api-internal/logout';
export const CONFIG_DATA_URL_REQUEST = '/api-internal/config';
export const USER_GET_URL_REQUEST = `/api-internal/user`;
export const USER_UPDATE_URL_REQUEST = id => `/api-internal/user/${id}`;