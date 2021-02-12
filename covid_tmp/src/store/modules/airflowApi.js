import axios from 'axios'

import getYesterdayDate from "@/plugins/yesterday";

export default {
    namespaced: true,
    state: {
        loading: false,

        globalUpdateStatus: '',
        UKUpdateStatus: '',
        OWIDUpdateStatus: '',
        G_mob_UpdateStatus: ''


    },
    getters: {

        GET_GLOB_UPDATE: (state) => {return state.globalUpdateStatus},
        GET_UK_UPDATE: (state) => {return state.UKUpdateStatus},
        GET_OWID_UPDATE: (state) => {return state.OWIDUpdateStatus},
        GET_g_mob_UPDATE: (state) => {return state.G_mob_UpdateStatus}

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.lastUpdateStatus = ''

        },

        SET_LOADING: (state, status) => { state.loading = status },

        SET_GLOB_UPDATE: (state, info) => {state.globalUpdateStatus = info},
        SET_UK_UPDATE: (state, info) => {state.UKUpdateStatus = info},
        SET_OWID_UPDATE: (state, info) => {state.OWIDUpdateStatus = info},
        SET_g_mob_UPDATE: (state, info) => {state.G_mob_UpdateStatus = info},
    },
    actions: {
        GET_DASHBOARD: async ({commit}) => {
            commit('SET_LOADING', true)
            let executionDate = getYesterdayDate()
            let globDagName = 'csse_covid_dl_to_db_org_210210_01'
            let UKDagName = 'uk_covid_dl_to_db_org_210209_01'
            let OWIDDagName = 'OWID_covid_dl_to_db_org_0208_11'
            let G_mob_DagName = 'google_mobility_dl_210211_15'

            let globExecutionTime = '09:00:00+00:00'
            let UKExecutionTime = '00:00:00+00:00'
            let OWIDExecutionTime = '00:00:00+00:00'
            let G_mob_ExecutionTime = '00:00:00+00:00'

            let globAirflowLink = '/airflow' + `/api/experimental/dags/${globDagName}/dag_runs/${executionDate}T${globExecutionTime}`
            let UKAirflowLink = '/airflow' + `/api/experimental/dags/${UKDagName}/dag_runs/${executionDate}T${UKExecutionTime}`
            let OWIDAirflowLink = '/airflow' + `/api/experimental/dags/${OWIDDagName}/dag_runs/${executionDate}T${OWIDExecutionTime}`
            let G_mob_AirflowLink = '/airflow' + `/api/experimental/dags/${G_mob_DagName}/dag_runs/${executionDate}T${G_mob_ExecutionTime}`

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
                        } else if (error.response.status === 502) {
                            commit('SET_GLOB_UPDATE', 'Airflow Web Server Dead. (will be fixed soon)')
                        }
                    }

                })

            await axios.get(UKAirflowLink, {})
                .then(function (response) {
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
                        } else if (error.response.status === 502) {
                            commit('SET_UK_UPDATE', 'Airflow Web Server Dead.')
                        }
                    }

                })

            await axios.get(OWIDAirflowLink, {})
                .then(function (response) {
                    if (response.data.state === 'success') {
                        commit('SET_OWID_UPDATE', 'Done')
                    } else if (response.data.state === 'running') {
                        commit('SET_OWID_UPDATE', 'Processing')
                    } else {
                        commit('SET_OWID_UPDATE', 'Error occurred on Airflow DAG.')
                    }
                })
                .catch(function (error){
                    if (error) {
                        if (error.response.status === 404) {
                            commit('SET_OWID_UPDATE', 'Before Processing for yesterday data.')
                        } else if (error.response.status === 502) {
                            commit('SET_OWID_UPDATE', 'Airflow Web Server Dead.')
                        }
                    }

                })
            await axios.get(G_mob_AirflowLink, {})
                .then(function (response) {
                    if (response.data.state === 'success') {
                        commit('SET_g_mob_UPDATE', 'Done')
                    } else if (response.data.state === 'running') {
                        commit('SET_g_mob_UPDATE', 'Processing')
                    } else {
                        commit('SET_g_mob_UPDATE', 'Error occurred on Airflow DAG.')
                    }
                })
                .catch(function (error){
                    if (error) {
                        if (error.response.status === 404) {
                            commit('SET_g_mob_UPDATE', 'Before Processing for yesterday data.')
                        } else if (error.response.status === 502) {
                            commit('SET_g_mob_UPDATE', 'Airflow Web Server Dead.')
                        }
                    }

                })

            commit('SET_LOADING', false)

        },
    },

}