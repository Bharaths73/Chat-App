const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const Auth={
    LOGIN_API:BASE_URL+'/auth/login',
    SIGNUP_API:BASE_URL+'/auth/signup',
}

export const Profile={
    UPDATE_USER_API:BASE_URL+'/profile/update',
    UPDATE_USER_IMAGE_API:BASE_URL+'/profile/update-image',
    DELETE_USER_IMAGE_API:BASE_URL+'/profile/delete-image',
}