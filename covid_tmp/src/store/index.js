import appBase from "@/store/modules/appBase";
import covidGraph from "./modules/covidGraph";
import covidNewGraph from "@/store/modules/covidNewGraph";

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appBase: appBase,
        covidGraph: covidGraph,
        covidNewGraph: covidNewGraph
    }
})