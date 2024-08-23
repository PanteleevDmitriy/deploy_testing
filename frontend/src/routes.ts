import { Authorisation } from "./components/Authorisation";
import { LOGIN_ROUTE, QR_ROUTE, REGISTRATION_ROUTE, USERS_ROUTE } from "./utils/constants";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Authorisation
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Authorisation
    },
]

export const authRoutes = [
    {
        path: QR_ROUTE,
        Component: Authorisation
    },
    {
        path: USERS_ROUTE,
        Component: Authorisation
    },
]