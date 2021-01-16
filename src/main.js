import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './router/routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

let app = createApp(App)
    .use(Toast, { 
        position: POSITION.BOTTOM_CENTER,
        transition: "Vue-Toastification__slideBlurred",
        maxToasts: 1
    })

let router = createRouter({
    history: createWebHistory(),
    routes: import.meta.hot ? [] : routes
})
if (import.meta.hot) {
    let removeRoutes = []

    for (let route of routes) {
        removeRoutes.push(router.addRoute(route))
    }

    import.meta.hot.acceptDeps('./routes.js', ({ routes }) => {
        for (let removeRoute of removeRoutes) removeRoute()
        removeRoutes = []
        for (let route of routes) {
        removeRoutes.push(router.addRoute(route))
        }
        router.replace('')
    })
}

app.use(router)

app.mount('#app')
