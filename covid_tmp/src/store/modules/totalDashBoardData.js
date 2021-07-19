import axios from 'axios'
import getTargetDate from "@/plugins/getToday";

export default {
    namespaced: true,
    state: {
        loading: false,

        covid: {
            info: {},
            preds: {},
            pred_accuracy: {},
            lstm_preds: {},
            lstm_pred_accuracy: {}
        },

        mobility: {},

        owid: {
            health: {},
            mortality: {},
            testing: {
                data: {},
                meta: {}
            },
            vaccination: {
                data: {},
                meta: {}
            }
        }
    },
    getters: {
        GET_LOADING: (state) => {return state.loading},

        GET_COVID: (state) => {return state.covid},
        GET_MOBILITY: (state) => {return state.mobility},
        GET_OWID: (state) => {return state.owid},

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.covid = {
                info: {},
                preds: {},
                pred_accuracy: {},
                lstm_preds: {},
                lstm_pred_accuracy: {}
            }

            state.mobility = {}

            state.owid = {
                health: {},
                mortality: {},
                testing: {
                    data: {},
                    meta: {}
                },
                vaccination: {
                    data: {},
                    meta: {}
                }
            }
        },

        SET_LOADING: (state, status) => {state.loading = status},

        SET_COVID_INFO: (state, info) => {state.covid.info = info},
        SET_COVID_PREDS: (state, info) => {state.covid.preds = info},
        SET_COVID_PRED_ACCURACY: (state, info) => {state.covid.pred_accuracy = info},
        SET_COVID_LSTM_PREDS: (state, info) => {state.covid.lstm_preds = info},
        SET_COVID_LSTM_PRED_ACCURACY: (state, info) => {state.covid.lstm_pred_accuracy = info},

        SET_MOBILITY: (state, info) => {state.mobility = info},

        SET_OWID_HEALTH: (state, info) => {state.owid.health = info},
        SET_OWID_MORTALITY: (state, info) => {state.owid.mortality = info},
        SET_OWID_TESTING_DATA: (state, info) => {state.owid.testing.data = info},
        SET_OWID_VACCINATION_DATA: (state, info) => {state.owid.vaccination.data = info},

        SET_OWID_TESTING_META: (state, info) => {state.owid.testing.meta = info},
        SET_OWID_VACCINATION_META: (state, info) => {state.owid.vaccination.meta = info},


    },
    actions: {
        REQUEST_COVID_INFO: async ({commit, rootState}) => {
            if (rootState.totalDashBoard.country.code !== 'GBR'
                || rootState.totalDashBoard.sub_division.code === 'all'){
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/global/cases/`,
                    {params: {CountryCode: rootState.totalDashBoard.country.code,
                            startDate: getTargetDate(28),
                            offset: 28}})
                    .then(function (response) {
                        commit('SET_COVID_INFO', response.data)
                    }).catch()
            } else {
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/uk/cases/`,
                    {params: {regionCode: rootState.totalDashBoard.sub_division.code,
                            startDate: getTargetDate(28),
                            offset: 28}})
                    .then(function (response) {
                        commit('SET_COVID_INFO', response.data)
                    }).catch()
            }
        },
        REQUEST_COVID_PREDS: async ({commit, rootState}) => {
            if (rootState.totalDashBoard.country.code !== 'GBR'
                || rootState.totalDashBoard.sub_division.code === 'all'){
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/global/prediction/`,
                    {params: {CountryCode: rootState.totalDashBoard.country.code,
                            startDate: getTargetDate(2),
                            offset:7,
                            predictedDate: getTargetDate(3)
                        }})
                    .then(function (response) {
                        commit('SET_COVID_PREDS', response.data)
                    }).catch(function () {
                        commit('SET_COVID_PREDS', null)
                    })
            } else {
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/uk/prediction/`,
                    {params: {regionCode: rootState.totalDashBoard.sub_division.code,
                            startDate: getTargetDate(2),
                            offset:7,
                            predictedDate: getTargetDate(3)
                        }})
                    .then(function (response) {
                        commit('SET_COVID_PREDS', response.data)
                    }).catch(function () {
                        commit('SET_COVID_PREDS', null)
                    })
            }
        },
        REQUEST_COVID_ACCURACY: async ({commit, rootState}) => {
            if (rootState.totalDashBoard.country.code !== 'GBR'
                || rootState.totalDashBoard.sub_division.code === 'all'){
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/global/predictionAccuracy/`,
                    {params: {CountryCode: rootState.totalDashBoard.country.code,
                            startDate: getTargetDate(3),
                            offset:1,
                        }})
                    .then(function (response) {
                        commit('SET_COVID_PRED_ACCURACY', response.data)
                    }).catch(function () {
                        commit('SET_COVID_PRED_ACCURACY', null)
                    })
            } else {
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/uk/predictionAccuracy/`,
                    {params: {regionCode: rootState.totalDashBoard.sub_division.code,
                            startDate: getTargetDate(3),
                            offset:1,
                        }})
                    .then(function (response) {
                        commit('SET_COVID_PRED_ACCURACY', response.data)
                    }).catch(function () {
                        commit('SET_COVID_PRED_ACCURACY', null)
                    })
            }
        },
        REQUEST_COVID_LSTM_PREDS: async ({commit, rootState}) => {
            if (rootState.totalDashBoard.country.code !== 'GBR'
                || rootState.totalDashBoard.sub_division.code === 'all'){
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/global/lstm_prediction/`,
                    {params: {CountryCode: rootState.totalDashBoard.country.code,
                            startDate: getTargetDate(0),
                            offset:28,
                            predictedDate: getTargetDate(1)
                        }})
                    .then(function (response) {
                        commit('SET_COVID_LSTM_PREDS', response.data)
                    }).catch(function () {
                        commit('SET_COVID_LSTM_PREDS', null)
                    })
            } else {
                // uk region lstm not supported
                commit('SET_COVID_LSTM_PREDS', null)
            }
        },
        REQUEST_COVID_LSTM_ACCURACY: async ({commit, rootState}) => {
            if (rootState.totalDashBoard.country.code !== 'GBR'
                || rootState.totalDashBoard.sub_division.code === 'all'){
                await axios.get(process.env.VUE_APP_DJANGO_API + `/covid/global/lstm_predictionAccuracy/`,
                    {params: {CountryCode: rootState.totalDashBoard.country.code,
                            startDate: getTargetDate(3),
                            offset:1,
                        }})
                    .then(function (response) {
                        commit('SET_COVID_LSTM_PRED_ACCURACY', response.data)
                    }).catch(function () {
                        commit('SET_COVID_LSTM_PRED_ACCURACY', null)
                    })
            } else {
                // uk region lstm not supported
                commit('SET_COVID_LSTM_PRED_ACCURACY', null)
            }
        },
        // #############################################

        REQUEST_GOOGLE_MOBILITY: async ({commit, rootState}) => {

            await axios.get(process.env.VUE_APP_DJANGO_API + `/google/mobility/info/`,
                {params: {regionCode: rootState.totalDashBoard.country.code,
                        startDate: getTargetDate(37),
                        offset:35,
                    }})
                .then(function (response) {
                    commit('SET_MOBILITY', response.data)
                }).catch()
        },

        // #############################################
        REQUEST_OWID_HEALTH: async ({commit, rootState}) => {
            await axios.get(process.env.VUE_APP_DJANGO_API + `/owid/data/health/`,
                {params: {regionCode: rootState.totalDashBoard.country.code,
                        startDate: '2020-11-28',
                        offset: 1,
                    }})
                .then(function (response) {
                    commit('SET_OWID_HEALTH', response.data)
                }).catch()
        },
        REQUEST_OWID_MORTALITY: async ({commit, rootState}) => {
            await axios.get(process.env.VUE_APP_DJANGO_API + `/owid/data/mortality/`,
                {params: {regionCode: rootState.totalDashBoard.country.code,
                        startDate: getTargetDate(70),
                        offset: 70,
                    }})
                .then(function (response) {
                    commit('SET_OWID_MORTALITY', response.data)
                }).catch()
        },

        // BELOW TWO POINTS HAVE META DATA ENDPOINT
        REQUEST_OWID_TESTING: async ({commit, rootState}) => {
            await axios.get(process.env.VUE_APP_DJANGO_API + `/owid/data/testing/`,
                {params: {regionCode: rootState.totalDashBoard.country.code,
                        startDate: getTargetDate(30),
                        offset:28,
                    }})
                .then(function (response) {
                    commit('SET_OWID_TESTING_DATA', response.data)
                }).catch()

            await axios.get(process.env.VUE_APP_DJANGO_API + `/owid/meta/testing/`,
                {params: {regionCode: rootState.totalDashBoard.country.code}})
                .then(function (response) {
                    commit('SET_OWID_TESTING_META', response.data)
                }).catch()
        },
        REQUEST_OWID_VACCINATION: async ({commit, rootState}) => {
            await axios.get(process.env.VUE_APP_DJANGO_API + `/owid/data/vaccination/`,
                {params: {regionCode: rootState.totalDashBoard.country.code,
                        startDate: getTargetDate(30),
                        offset:28,
                    }})
                .then(function (response) {
                    commit('SET_OWID_VACCINATION_DATA', response.data)
                }).catch()

            await axios.get(process.env.VUE_APP_DJANGO_API + `/owid/meta/vaccination/`,
                {params: {regionCode: rootState.totalDashBoard.country.code}})
                .then(function (response) {
                    commit('SET_OWID_VACCINATION_META', response.data)
                }).catch()
        },


    },

}