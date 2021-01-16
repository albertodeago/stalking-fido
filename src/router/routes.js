import Home from '../views/home/Home.vue'
import NotFound from '../views/NotFound.vue'

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
