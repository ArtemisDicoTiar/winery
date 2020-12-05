import axios from 'axios'

import getYesterdayDate from "@/plugins/yesterday";

export default {
    namespaced: true,
    state: {
        loading: false,

        globalUpdateStatus: '',
        UKUpdateStatus: ''

    },
    getters: {

        GET_GLOB_UPDATE: (state) => {return state.globalUpdateStatus},
        GET_UK_UPDATE: (state) => {return state.UKUpdateStatus}

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.lastUpdateStatus = ''

        },

        SET_LOADING: (state, status) => { state.loading = status },

        SET_GLOB_UPDATE: (state, info) => {state.globalUpdateStatus = info},
        SET_UK_UPDATE: (state, info) => {state.UKUpdateStatus = info}
    },
    actions: {
        GET_DASHBOARD: async ({commit}) => {
            commit('SET_LOADING', true)
            let executionDate = getYesterdayDate()
            let globDagName = 'csse_covid_dl_to_db_org_201117_01'
            let UKDagName = 'uk_covid_dl_to_db_org_201117_01'
            let globExecutionTime = '10:30:00+00:00'
            let UKExecutionTime = '03:00:00+00:00'

            let globAirflowLink = '/airflow' + `/api/experimental/dags/${globDagName}/dag_runs/${executionDate}T${globExecutionTime}`
            let UKAirflowLink = '/airflow' + `/api/experimental/dags/${UKDagName}/dag_runs/${executionDate}T${UKExecutionTime}`

            await axios.get(globAirflowLink, {})
                .then(function (response) {
                    if (response.data.state === 'success') {
                        commit('SET_GLOB_UPDATE', 'Done')
                    } else if (response.data.state === 'running') {
                        commit('SET_GLOB_UPDATE', 'Processing')
                    } else {
                        commit('SET_GLOB_UPDATE', 'Error occurred on Airflow DAG.')
                    }
                })
                .catch(function (error){
                    if (error) {
                        if (error.response.status === 404) {
                            commit('SET_GLOB_UPDATE', 'Before Processing for yesterday data.')
                        }
                    } else {
                        commit('SET_GLOB_UPDATE', 'Airflow Web Server Dead. (will be fixed soon)')
                    }

                })

            await axios.get(UKAirflowLink, {})
                .then(function (response) {10
                    if (response.data.state === 'success') {
                        commit('SET_UK_UPDATE', 'Done')
                    } else if (response.data.state === 'running') {
                        commit('SET_UK_UPDATE', 'Processing')
                    } else {
                        commit('SET_UK_UPDATE', 'Error occurred on Airflow DAG.')
                    }
                })
                .catch(function (error){
                    if (error) {
                        if (error.response.status === 404) {
                            commit('SET_UK_UPDATE', 'Before Processing for yesterday data.')
                        }
                    } else {
                        commit('SET_UK_UPDATE', 'Airflow Web Server Dead. (will be fixed soon)')
                    }

                })

            commit('SET_LOADING', false)

        },
    },

}