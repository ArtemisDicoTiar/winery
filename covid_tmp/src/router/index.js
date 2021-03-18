import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/covidStatusGraph/covidGraphHome";

import covidGlobalDashboard from "@/components/covidStatusGraph/covidGlobal/covidGlobalDashboard";
import covidGraphbyRegion from "@/components/covidStatusGraph/covidGlobal/covidGraphbyRegionCumul";
import covidGraphbyRegionNews from "@/components/covidStatusGraph/covidGlobal/covidGraphbyRegionNews";

import covidUKDashboard from "@/components/covidStatusGraph/covidUK/covidUKDashboard";
import covidGraphbyUKAll from "@/components/covidStatusGraph/covidUK/covidGraphbyUKAll";

import DashboardView from "@/components/covidRegionDashboard/DashboardView";

import vaccinationDashboard from "@/components/covidStatusGraph/postData/vaccinationDashboard";
import testingDashboard from "@/components/covidStatusGraph/postData/testingDashboard";
import p_scoreDashboard from "@/components/covidStatusGraph/postData/p_scoreDashboard";

import googleMobilityDashboard from "@/components/covidStatusGraph/postData/googleMobilityDashboard";

import ProjectOwner from "@/components/ProjectOwner";
import error404 from "@/components/error404";

import store from '../store/index'

Vue.use(VueRouter)

const routes = [

    { path: '/', component: Home },

    { path: '/dashboard', component: DashboardView},

    { path: '/global', redirect: '/global/dashboard'},
    { path: '/global/dashboard', component: covidGlobalDashboard},
    { path: '/global/cumulative', component: covidGraphbyRegion},
    { path: '/global/new', component: covidGraphbyRegionNews},

    { path: '/uk', redirect: '/uk/dashboard'},
    { path: '/uk/dashboard', component: covidUKDashboard},
    { path: '/uk/graph', component: covidGraphbyUKAll },

    { path: '/post/vaccination', component: vaccinationDashboard},
    { path: '/post/testing', component: testingDashboard},
    { path: '/post/mortality', component: p_scoreDashboard},
    { path: '/post/mobility', component: googleMobilityDashboard},

    { path: '/about', component: ProjectOwner},
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