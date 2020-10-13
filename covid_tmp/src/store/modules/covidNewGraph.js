import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,

        plot: {
            data: [],
            layout: {}
        },

        target: {
            continent: '',
            country: '',
        },
        data: {
            timeStamp: {},
            confirmed: {},
            deaths: {},

            // removed: {},
            recovered: {},
        }



    },
    getters: {
        GET_CONTINENT_NAME: (state) => {return state.target.continent},
        GET_COUNTRY_NAME: (state) => {return state.target.country},

        GET_TIMESTAMP: (state) => {return state.data.timeStamp},

        GET_CONFIRMED_DATA: (state) => {return state.data.confirmed},
        GET_DEATHS_DATA: (state) => {return state.data.deaths},

        GET_REMOVED_DATA: (state) => {return state.data.removed},
        GET_RECOVERED_DATA: (state) => {return state.data.recovered},

    },
    mutations: {
        SET_LOADING: (state, status) => {state.loading = status},

        SET_PLOT_DATA: (state, data) => {state.plot.data = data},
        SET_PLOT_LAYOUT: (state, infos) => {state.plot.layout = infos},

        SET_CONTINENT_NAME: (state, continent) => {state.target.continent = continent},
        SET_COUNTRY_NAME: (state, country) => {state.target.country = country},

        SET_TIMESTAMP: (state, timeStamps) => {state.data.timeStamp = timeStamps},

        SET_CONFIRMED_DATA: (state, data) => {state.data.confirmed = data},
        SET_DEATHS_DATA: (state, data) => {state.data.deaths = data},

        SET_REMOVED_DATA: (state, data) => {state.data.removed = data},
        SET_RECOVERED_DATA: (state, data) => {state.data.recovered = data},
    },
    actions: {
        SEARCH_COVID_INFO_BY_REGION: async ({commit, state}) => {
            commit('SET_LOADING', true)
            let targetLink = ''

            if (state.target.country === 'All') {
                targetLink = (tableType) => process.env.VUE_APP_API + `/covid_new/${tableType}/continent/${state.target.continent}`
            } else {
                targetLink = (tableType) => process.env.VUE_APP_API + `/covid_new/${tableType}/country/${state.target.country}`
            }

            await axios.get(process.env.VUE_APP_API+'/covid_new/timeStamp', {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_TIMESTAMP', response.data)
                    }
                })

            // await axios.get(targetLink("active"), {})
            //     .then(function (response) {
            //         if (response.status !== 200) {
            //             alert('ERROR: ' + response)
            //         } else {
            //             commit('SET_ACTIVE_DATA', response.data)
            //         }
            //     })

            await axios.get(targetLink("deaths"), {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_DEATHS_DATA', response.data)
                    }
                })

            await axios.get(targetLink("recovered"), {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_RECOVERED_DATA', response.data)
                    }
                })

            // await axios.get(targetLink("removed"), {})
            //     .then(function (response) {
            //         if (response.status !== 200) {
            //             alert('ERROR: ' + response)
            //         } else {
            //             commit('SET_REMOVED_DATA', response.data)
            //         }
            //     })

            await axios.get(targetLink("confirmed"), {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_CONFIRMED_DATA', response.data)
                    }
                })
            commit('SET_LOADING', false)
            commit('SET_PLOT_DATA',
                [
                    {
                        y: state.data.confirmed,
                        x: state.data.timeStamp,
                        mode: 'lines',
                        marker: {color: 'orange'},
                        type: "scatter",
                        name: 'Confirmed'
                    },{
                        y: state.data.deaths,
                        x: state.data.timeStamp,
                        mode: 'lines',
                        marker: {color: 'red'},
                        type: "scatter",
                        name: 'Deaths'
                    },{
                        y: state.data.recovered,
                        x: state.data.timeStamp,
                        mode: 'lines',
                        marker: {color: 'green'},
                        type: "scatter",
                        name: 'Recovered'
                    }
                    // ,{
                    //     y: state.data.removed,
                    //     x: state.data.timeStamp,
                    //     mode: 'lines',
                    //     type: "scatter",
                    //     name: 'Removed'
                    // }
                ]
            )

            commit('SET_PLOT_LAYOUT', {
                title: 'COVID 19 New Cases status ' + state.target.continent + ' >>> ' + state.target.country
            })


        },
    },

}