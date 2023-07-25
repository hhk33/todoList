import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Doing from '@/components/Content/Doing'
import List from '@/components/Content/List'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
    routes: [
        {
            path: '/',//重定向
            redirect: '/list'
        }
        ,
        {
            path: "/list",
            name: "List",
            component: List,
        },
        {
            path: "/doing",
            name: "Doing",
            component: Doing,
        },
    ]
})