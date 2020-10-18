import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,

        baseAreas: {},

        plot: {
            data: [],
            layout: {}
        },

        target: {
            localAuthority: '',
            areaName: '',
            areaCode: ''
        },
        data: {
            date: {},

            confirmedCumulative: {},
            confirmedDaily: {},

            cumDeaths28DaysByDeathDate: {},
            cumDeaths28DaysByDeathDateRate: {},

            cumDeaths28DaysByPublishDate: {},
            cumDeaths28DaysByPublishDateRate: {},

            newDeaths28DaysByPublishDate: {},

        }

    },
    getters: {
        GET_BASE_AREAS: (state) => {return state.baseAreas},

        GET_LOCAL_AUTHORITY_TYPE: (state) => {return state.target.localAuthority},
        GET_AREA_NAME: (state) => {return state.target.areaName},
        GET_AREA_CODE: (state) => {return state.target.areaCode},

        GET_DATE: (state) => {return state.data.date},

        GET_CONFIRMED_NEW_DATA: (state) => {return state.data.confirmedDaily},
        GET_CONFIRMED_CUMUL_DATA: (state) => {return state.data.confirmedCumulative},

        GET_DEATHS_CUM_BY_DEATHDATE_DATA: (state) => {return state.data.cumDeaths28DaysByDeathDate},
        GET_DEATHS_CUM_BY_DEATHDATE_RATE: (state) => {return state.data.cumDeaths28DaysByDeathDateRate},

        GET_DEATHS_CUM_BY_PUBDATE_DATA: (state) => {return state.data.cumDeaths28DaysByPublishDate},
        GET_DEATHS_CUM_BY_PUBDATE_RATE: (state) => {return state.data.cumDeaths28DaysByPublishDateRate},

        GET_DEATHS_NEW_BY_PUBDATE_RATE: (state) => {return state.data.newDeaths28DaysByPublishDate},
    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.baseAreas = {}

            state.plot.data = []
            state.plot.layout = {}

            state.target.localAuthority = ''
            state.target.areaName = ''
            state.target.areaCode = ''

            state.data.date = {}

            state.data.confirmedCumulative = {}
            state.data.confirmedDaily = {}

            state.data.cumDeaths28DaysByDeathDate = {}
            state.data.cumDeaths28DaysByDeathDateRate = {}

            state.data.cumDeaths28DaysByPublishDate = {}
            state.data.cumDeaths28DaysByPublishDateRate = {}

            state.data.newDeaths28DaysByPublishDate = {}
        },

        SET_LOADING: (state, status) => {state.loading = status},

        SET_PLOT_DATA: (state, data) => {state.plot.data = data},
        SET_PLOT_LAYOUT: (state, infos) => {state.plot.layout = infos},

        SET_BASE_AREAS: (state, data) => {state.baseAreas = data},

        SET_LOCAL_AUTHORITY_TYPE: (state, data) => {state.target.localAuthority = data},
        SET_AREA_NAME: (state, data) => {state.target.areaName = data},
        SET_AREA_CODE: (state, data) => {state.target.areaCode = data},

        SET_DATE: (state, data) => {state.data.date = data},

        SET_CONFIRMED_NEW_DATA: (state, data) => {state.data.confirmedDaily = data},
        SET_CONFIRMED_CUMUL_DATA: (state, data) => {state.data.confirmedCumulative = data},

        SET_DEATHS_CUM_BY_DEATHDATE_DATA: (state, data) => {state.data.cumDeaths28DaysByDeathDate = data},
        SET_DEATHS_CUM_BY_DEATHDATE_RATE: (state, data) => {state.data.cumDeaths28DaysByDeathDateRate = data},

        SET_DEATHS_CUM_BY_PUBDATE_DATA: (state, data) => {state.data.cumDeaths28DaysByPublishDate = data},
        SET_DEATHS_CUM_BY_PUBDATE_RATE: (state, data) => {state.data.cumDeaths28DaysByPublishDateRate = data},

        SET_DEATHS_NEW_BY_PUBDATE_RATE: (state, data) => {state.data.newDeaths28DaysByPublishDate = data},
    },
    actions: {
        RECEIVE_AREA_NAMES: async ({commit, state}) => {
            await axios.get(process.env.VUE_APP_API+`/covid_uk/code/${state.target.localAuthority}`, {})
                .then(function(response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_BASE_AREAS', response.data)
                    }
            })
        },
        SEARCH_COVID_INFO_BY_REGION: async ({commit, state}) => {
            commit('SET_LOADING', true)

            await axios.get(process.env.VUE_APP_API+`/covid_uk/${state.target.localAuthority}/${state.target.areaCode}`, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_DATE', response.data.date)

                        commit('SET_CONFIRMED_NEW_DATA', response.data.confirmedDaily)
                        commit('SET_CONFIRMED_CUMUL_DATA', response.data.confirmedCumulative)

                        commit('SET_DEATHS_CUM_BY_DEATHDATE_DATA', response.data.cumDeaths28DaysByDeathDate)
                        commit('SET_DEATHS_CUM_BY_DEATHDATE_RATE', response.data.cumDeaths28DaysByDeathDateRate)

                        commit('SET_DEATHS_CUM_BY_PUBDATE_DATA', response.data.cumDeaths28DaysByPublishDate)
                        commit('SET_DEATHS_CUM_BY_PUBDATE_RATE', response.data.cumDeaths28DaysByPublishDateRate)

                        commit('SET_DEATHS_NEW_BY_PUBDATE_RATE', response.data.newDeaths28DaysByPublishDate)
                    }
                })

            commit('SET_LOADING', false)
            commit('SET_PLOT_DATA',
                [
                    {
                        y: state.data.confirmedDaily,
                        x: state.data.date,
                        marker: {color: '#DC3912'},
                        type: "bar",
                        name: 'Conf Dly'
                    },{
                        y: state.data.confirmedCumulative,
                        x: state.data.date,
                        mode: 'lines',
                        marker: {color: '#EF553B'},
                        type: "scatter",
                        name: 'Conf Cuml'
                    },{
                        y: state.data.cumDeaths28DaysByDeathDate,
                        x: state.data.date,
                        marker: {color: '#620042'},
                        type: "bar",
                        name: 'CumlD/DD'
                    },{
                        y: state.data.cumDeaths28DaysByDeathDateRate,
                        x: state.data.date,
                        mode: 'lines',
                        marker: {color: '#782AB6'},
                        type: "scatter",
                        name: 'CumlD/DR'
                    },{
                        y: state.data.cumDeaths28DaysByPublishDate,
                        x: state.data.date,
                        marker: {color: '#1F77B4'},
                        type: "bar",
                        name: 'CumlD/PD'
                    }, {
                        y: state.data.cumDeaths28DaysByPublishDateRate,
                        x: state.data.date,
                        mode: 'lines',
                        marker: {color: '#72B7B2'},
                        type: "scatter",
                        name: 'CumlD/PR'
                    },{
                        y: state.data.newDeaths28DaysByPublishDate,
                        x: state.data.date,
                        marker: {color: '#8f8F8F'},
                        type: "bar",
                        name: 'NewD/PD'
                    },
                ]
            )

            commit('SET_PLOT_LAYOUT', {
                title: 'COVID 19 UK status ' + ' >>> ' + state.target.areaName
            })


        },
    },

}