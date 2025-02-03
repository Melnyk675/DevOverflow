const ROUTES = {
    HOME: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    PROFILE: (id: number) => `/profile/${id}`,
}

export default ROUTES;