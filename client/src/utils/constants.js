
export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES =  "api/auth";
export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`
export const UPDATE_PROFILE_IMAGE = `${AUTH_ROUTES}/update-profile-image`
export const DELETE_PROFILE_IMAGE = `${AUTH_ROUTES}/delete-profile-image`
export const LOGOUT = `${AUTH_ROUTES}/logout`


export const CONTACTS_ROUTES = "api/contacts";
export const SEARCH_CONTACTS = `${CONTACTS_ROUTES}/search`;
export const GET_CONTACTS_FOR_DM = `${CONTACTS_ROUTES}/get-contacts-for-dm`;
export const GET_ALL_CONTACTS = `${CONTACTS_ROUTES}/get-all-contacts`;

export const MESSAGES_ROUTES = "api/messages";
export const GET_ALL_MESSAGES = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILE = `${MESSAGES_ROUTES}/upload-file`

export const CHANNEL_ROUTES = "api/channel";
export const CREATE_CHANNEL = `${CHANNEL_ROUTES}/create-channel`
export const GET_USER_CHANNELS = `${CHANNEL_ROUTES}/get-user-channels`