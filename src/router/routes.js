import Home from '../views/home/Home.vue'

export let routes = [{
    path: '/:path(.*)',
    component: Home,
    meta: { 
        title: 'Home'
    }
}]
