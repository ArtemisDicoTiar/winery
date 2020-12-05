import axios from 'axios'

import getYesterdayDate from "@/plugins/yesterday";

export default {
    namespaced: true,
    state: {
        loading: false,

        lastUpdateStatus: ''

    },
    getters: {

        GET_LAST_UPDATE: (state) => {return state.lastUpdateStatus}

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.lastUpdateStatus = ''

        },

        SET_LOADING: (state, status) => { state.loading = status },

        SET_LAST_UPDATE: (state, info) => {state.lastUpdateStatus = info}
    },
    actions: {
        GET_DASHBOARD: async ({commit}, payload) => {
            commit('SET_LOADING', true)
            let area = payload.area

            let airflowLink = ''

            let executionDate = getYesterdayDate()
            let dagName = ''
            let executionTime = ''
            if (area === 'global') {
                dagName = 'csse_covid_dl_to_db_org_201117_01'
                executionTime = '10:30:00+00:00'
            } else if (area === 'uk') {
                dagName = 'uk_covid_dl_to_db_org_201117_01'
                executionTime = '03:00:00+00:00'
            } else {
                alert('AREA TYPE ERROR (PAGE SECTION ERROR')
            }

            airflowLink = '/airflow' + `/api/experimental/dags/${dagName}/dag_runs/${executionDate}T${executionTime}`

            await axios.get(airflowLink, {})
                .then(function (response) {
                    if (response.data.state === 'success') {
                        commit('SET_LAST_UPDATE', 'Done')
                    } else if (response.data.state === 'running') {
                        commit('SET_LAST_UPDATE', 'Processing')
                    } else {
                        commit('SET_LAST_UPDATE', 'Error occurred on Airflow DAG.')
                    }
                    commit('SET_LOADING', false)
                })
                .catch(function (error){
                    if (error) {
                        if (error.response.status === 404) {
                            commit('SET_LAST_UPDATE', 'Before Processing for yesterday data.')
                        } else if (error.response.status % 100 === 5) {
                            commit('SET_LAST_UPDATE', 'Airflow Web Server Dead. (will be fixed soon)')
                        }
                    }

                })

        },
    },

}