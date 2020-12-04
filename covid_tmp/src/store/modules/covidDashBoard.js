import axios from 'axios'

import getYesterdayDate from "@/plugins/yesterday";

export default {
    namespaced: true,
    state: {
        loading: false,

        area_type: '',
        target: '',
        data: {

        },

        lastUpdate: ''

    },
    getters: {
        GET_LOADING: (state) => {return state.loading},

        GET_AREA_TYPE: (state) => {return state.area_type},
        GET_TARGET: (state) => {return state.target},

        GET_DATA: (state) => {return state.data},

        GET_LAST_UPDATE: (state) => {return state.lastUpdate}

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.target = ''
            state.area_type = ''

            state.data = {}

        },

        SET_LOADING: (state, status) => { state.loading = status },
        SET_AREA_TYPE: (state, info) => { state.area_type = info },
        SET_TARGET: (state, info) => { state.target = info },

        SET_DATA: (state, info) => { state.data = info },

        SET_LAST_UPDATE: (state, info) => {state.lastUpdate = info}
    },
    actions: {
        GET_DASHBOARD: async ({commit, state}) => {
            commit('SET_LOADING', true)
            let targetLink = ''
            let airflowLink = ''

            let executionDate = getYesterdayDate()
            let dagName = ''
            let executionTime = ''
            if (state.area_type === 'global') {
                targetLink = process.env.VUE_APP_API + `/covid/glob/${state.target}/dashboard`
                dagName = 'csse_covid_dl_to_db_org_201117_01'
                executionTime = '10:30:00+00:00'
            } else if (state.area_type === 'uk') {
                dagName = 'uk_covid_dl_to_db_org_201117_01'
                targetLink = process.env.VUE_APP_API + `/covid/uk/${state.target}/dashboard`
                executionTime = '03:00:00+00:00'
            } else {
                alert('AREA TYPE ERROR (PAGE SECTION ERROR')
            }

            airflowLink = '/airflow' + `/api/experimental/dags/${dagName}/dag_runs/${executionDate}T${executionTime}`

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_DATA', response.data)
                        commit('SET_LOADING', false)
                    }
                })

            await axios.get(airflowLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert ('ERROR: ' + 'Airflow WebServer Dead ->' + response)
                    } else {
                        commit('SET_LAST_UPDATE', response.data.state)
                    }
                })

            console.log(state.lastUpdate)
        },
    },

}