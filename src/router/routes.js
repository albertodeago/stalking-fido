import Home from '../views/home/Home.vue'
import NotFound from '../views/NotFound.vue'

// lazy loaded routes
const Record = () => import('/@/views/record/Record.vue')

export let routes = [{
    path: '/',
    component: Home,
    meta: { 
        title: 'Home'
    }
}, {
    path: '/:path(.*)',
    component: NotFound
}]
