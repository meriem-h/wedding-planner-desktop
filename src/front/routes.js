import Login from './page/Login'
import Register from './page/Register'
import Home from './page/Home'
import Dashboard from './page/Dashboard'

export const publicRoutes = [
    { path: '/', component: Login },
    { path: '/Login', component: Login },
    { path: '/Register', component: Register },
]

export const privateRoutes = [
    { path: '/Dashboard', component: Dashboard, roles: ['planner', 'admin'] },
]