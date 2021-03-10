import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,

        plot: {
            dateRange: [],
            data: [],
            layout: {}
        },

        region_map: {},

        target_region_code: '',
        region_info: {},

        query_data_type: 'new',
        data: {

        },

    },
    getters: {
        GET_LOADING: (state) => {return state.loading},
        GET_REGION_MAP: (state) => {return state.region_map},
        GET_TIMESTAMP: (state) => {return state.data.timeStamp},

        GET_TARGET_REGION_CODE: (state) => {return state.target_region_code},
        GET_REGION_INFO: (state) => {return state.region_info},

        GET_QUERY_DATA_TYPE: (state) => {return state.query_data_type},

        GET_DATA: (state) => {return state.data},

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.plot.data = []
            state.plot.layout = {}

            state.region_map = {}
            state.target_region_code = ''
            state.region_info = {}

            state.query_data_type = ''

            state.data = {}

        },
        SET_LOADING: (state, status) => { state.loading = status },

        SET_DATE_RANGE: (state, status) => {state.plot.dateRange = status},

        SET_PLOT_DATA: (state, data) => {state.plot.data = data},
        SET_PLOT_LAYOUT: (state, infos) => {state.plot.layout = infos},

        SET_REGION_MAP: (state, info) => { state.region_map = info },

        SET_TARGET_REGION_CODE: (state, info) => { state.target_region_code = info},
        SET_REGION_INFO: (state, info) => { state.region_info = info },

        SET_QUERY_DATA_TYPE: (state, info) => { state.query_data_type = info },

        SET_DATA: (state, info) => { state.data = info },

    },
    actions: {
        GET_REGION_LIST: async ({commit}) => {
            // commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_API + `/owid/vaccination/regions`

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        var regionMap = {};
                        for (const row of response.data) {
                            regionMap[row['location']] = row['iso_code']
                        }
                        commit('SET_REGION_MAP', regionMap)
                    }
                })
        },
        GET_REGION_INFO: async ({commit, state}) => {
            // commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_API + `/owid/vaccination/regions/${state.target_region_code}`

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_REGION_INFO', response.data)
                        // commit('SET_LOADING', false)
                    }
                })
        },
        GET_REGION_DATA: async ({commit, state}) => {
            commit('SET_LOADING', true)

            let targetLink = process.env.VUE_APP_API + `/owid/vaccination/${state.query_data_type}/${state.target_region_code}`
            console.log(targetLink)
            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_DATA', response.data)
                        commit('SET_DATE_RANGE', Object.keys(response.data))
                        commit('SET_PLOT_DATA', Object.values(response.data))
                    }
                    commit('SET_PLOT_DATA',
                        [
                            {
                                y: state.plot.data,
                                x: state.plot.dateRange,
                                mode: 'bar',
                                type: "scatter",
                            }
                        ]
                    )

                    commit('SET_PLOT_LAYOUT', {
                        title: {
                            // y : 1,
                            text: state.query_data_type,
                            size: 15,
                        },
                        legend: {
                            itemsizing: "constant",
                            xanchor:"center",//"auto" | "left" | "center" | "right"
                            yanchor:"bottom",//"auto" | "top" | "middle" | "bottom"
                            y: -0.5,//number between or equal to -2 and 3
                            x: 0.5,//number between or equal to -2 and 3
                            orientation: "h",
                            font: {
                                size: 13,
                            }
                        },
                        xaxis: {
                            ticks: 'outside',
                            tickcolor: '#000',
                            range: state.plot.dateRange,
                        },
                        margin: {
                            l: 50,
                            r: 50,
                            t: 30,
                            b: 50,
                        },
                    })
                    commit('SET_LOADING', false)
                    console.log(state.plot)
                })
        },

    },

}