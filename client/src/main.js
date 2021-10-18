import 'mdb-vue-ui-kit/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Admin from './components/admin/Admin'
import Screen from './components/screen/Screen'
import Login from './components/admin/components/login'
import VueCarousel from 'vue-carousel';
import store from './store';
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueCarousel);

const router = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/admin',
            component: Admin
        },
        {
            path: '/admin/login',
            component: Login
        },
        {
            path: '/',
            component: Screen

        }
    ]
})

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')