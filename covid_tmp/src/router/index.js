import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/covidStatusGraph/covidGraphHome";

import covidGlobalDashboard from "@/components/covidStatusGraph/covidGlobal/covidGlobalDashboard";
import covidGraphbyRegion from "@/components/covidStatusGraph/covidGlobal/covidGraphbyRegionCumul";
import covidGraphbyRegionNews from "@/components/covidStatusGraph/covidGlobal/covidGraphbyRegionNews";

import covidUKDashboard from "@/components/covidStatusGraph/covidUK/covidUKDashboard";
import covidGraphbyUKAll from "@/components/covidStatusGraph/covidUK/covidGraphbyUKAll";

import error404 from "@/components/error404";

import store from '../store/index'

Vue.use(VueRouter)

// 1. 라우트 컴포넌트를 정의하세요.
// 아래 내용들은 다른 파일로부터 가져올 수 있습니다.
// 위에서 import하면 됨.

// 2. 라우트를 정의하세요.
// Each route should map to a component. The "component" can
// 각 라우트는 반드시 컴포넌트와 매핑되어야 합니다.
// "component"는 `Vue.extend()`를 통해 만들어진
// 실제 컴포넌트 생성자이거나 컴포넌트 옵션 객체입니다.
const routes = [

    { path: '/', component: Home },
    { path: '/global', redirect: '/global/dashboard'},
    { path: '/global/dashboard', component: covidGlobalDashboard},
    { path: '/global/cumulative', component: covidGraphbyRegion},
    { path: '/global/new', component: covidGraphbyRegionNews},

    { path: '/uk', redirect: '/uk/dashboard'},
    { path: '/uk/dashboard', component: covidUKDashboard},
    { path: '/uk/graph', component: covidGraphbyUKAll },

    { path: '*', component: error404}

]

// 3. `routes` 옵션과 함께 router 인스턴스를 만드세요.
// 추가 옵션을 여기서 전달해야합니다.
// 지금은 간단하게 유지하겠습니다.
const router = new VueRouter({
    mode: 'history',
    routes // `routes: routes`의 줄임
})

router.beforeEach((to, from, next) => {
    if (from.path === '/global/cumulative') {
        store.commit('covidGraph/SET_CLEAR')
        next()
    } else if (from.path === '/global/new') {
        store.commit('covidNewGraph/SET_CLEAR')
        next()
    } else if (from.path === '/uk') {
        store.commit('covidUKGraph/SET_CLEAR')
        next()
    }
    next()

})

export default router