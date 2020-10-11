import covidGraph from "./modules/covidGraph";
import appBase from "@/store/modules/appBase";

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        appBase: appBase,
        covidGraph: covidGraph
    }
})