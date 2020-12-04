import appBase from "@/store/modules/appBase";
import covidGraph from "./modules/covidGraph";
import covidNewGraph from "@/store/modules/covidNewGraph";
import covidUKGraph from "@/store/modules/covidUKGraph";
import covidDashBoard from "@/store/modules/covidDashBoard";
import airflowApi from "@/store/modules/airflowApi";

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appBase: appBase,
        covidGraph: covidGraph,
        covidNewGraph: covidNewGraph,
        covidUKGraph: covidUKGraph,

        covidDashBoard: covidDashBoard,

        airflowApi: airflowApi
    }
})