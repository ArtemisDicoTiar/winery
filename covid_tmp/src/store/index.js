import appBase from "@/store/modules/appBase";
import covidGraph from "./modules/covidGraph";
import covidNewGraph from "@/store/modules/covidNewGraph";
import covidUKGraph from "@/store/modules/covidUKGraph";
import covidDashBoard from "@/store/modules/covidDashBoard";

import owidVaccination from "@/store/modules/owidVaccination";
import owidTesting from "@/store/modules/owidTesting";
import owidPscore from "@/store/modules/owidPscore";

import googleMobility from "@/store/modules/googleMobility"

import airflowApi from "@/store/modules/airflowApi";

import totalDashBoard from "@/store/modules/totalDashBoard";
import totalDashBoardData from "@/store/modules/totalDashBoardData";

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

        owidVaccination: owidVaccination,
        owidTesting: owidTesting,
        owidMortality: owidPscore,

        googleMobility: googleMobility,

        totalDashBoard: totalDashBoard,
        totalDashBoardData: totalDashBoardData,

        airflowApi: airflowApi
    }
})