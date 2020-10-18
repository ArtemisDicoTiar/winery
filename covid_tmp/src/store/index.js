import appBase from "@/store/modules/appBase";
import covidGraph from "./modules/covidGraph";
import covidNewGraph from "@/store/modules/covidNewGraph";
import covidUKGraph from "@/store/modules/covidUKGraph";

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appBase: appBase,
        covidGraph: covidGraph,
        covidNewGraph: covidNewGraph,
        covidUKGraph: covidUKGraph
    }
})