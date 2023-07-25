import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import { Select, Option, Carousel, CarouselItem, Calendar } from 'element-ui'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//element-ui 插件
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Select)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Calendar)

new Vue({
    render: h => h(App),
    store,
    router,
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
}).$mount('#app')