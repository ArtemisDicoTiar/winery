import axios from 'axios'
var sma = require('sma');

export default {
    namespaced: true,
    state: {
        loading: false,

        plot: {
            dateRange: [],
            data: [],
            newData: [],
            cumData: [],
            posData: [],
            layout: {}
        },

        region_list: [],
        targetDataType: 'p_scores',
        isAverage: false,
        rangeStart: null,
        rangeEnd: null,
        target_region_code: '',


        pos_rate: false,
        data: {

        },

    },
    getters: {
        GET_LOADING: (state) => {return state.loading},
        GET_REGION_LIST: (state) => {return state.region_list},
        GET_TIMESTAMP: (state) => {return state.data.timeStamp},

        GET_TARGET_REGION_CODE: (state) => {return state.target_region_code},
        GET_REGION_INFO: (state) => {return state.region_info},

        GET_TARGET_DATA_TYPE: (state) => {return state.targetDataType},

        GET_DATA: (state) => {return state.data},

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.plot.data = []
            state.plot.newData = []
            state.plot.cumData = []
            state.plot.posData = []
            state.plot.layout = {}

            state.region_list = []
            state.target_region_code = ''
            state.region_info = {}

            state.pos_rate = false

            state.data = {}

        },
        SET_LOADING: (state, status) => { state.loading = status },
        SET_AVERAGE: (state, bool) => { state.isAverage = bool },
        SET_DATE_RANGE: (state, status) => {state.plot.dateRange = status},

        SET_PLOT_DATA: (state, data) => {state.plot.data = data},
        SET_RANGE_START: (state, data) => {state.rangeStart = data},
        SET_RANGE_END: (state, data) => {state.rangeEnd = data},


        SET_PLOT_LAYOUT: (state, infos) => {state.plot.layout = infos},

        SET_REGION_LIST: (state, info) => { state.region_list = info },

        SET_TARGET_REGION_CODE: (state, info) => { state.target_region_code = info},
        SET_REGION_INFO: (state, info) => { state.region_info = info },

        SET_TARGET_DATA_TYPE: (state, info) => { state.targetDataType = info },

        SET_DATA: (state, info) => { state.data = info },

    },
    actions: {
        GET_REGION_LIST: async ({commit}) => {
            // commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_API + `/owid/mortality/regions`

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_REGION_LIST', response.data)
                    }
                })
        },
        GET_REGION_DATA: async ({commit, state}) => {
            commit('SET_LOADING', true)
            var params = {
                average: state.isAverage,
                value_type: state.targetDataType,
            }
            if (state.targetDataType === 'p_scores') {
                params['age_range'] = state.rangeStart + ', ' + state.rangeEnd
            } else if (state.targetDataType === 'population') {
                params['year_range'] = state.rangeStart + ', ' + state.rangeEnd
            }

            var plot_data = []
            let newTargetLink = process.env.VUE_APP_API + `/owid/mortality/${state.target_region_code}`
            await axios.get(newTargetLink, {params: params})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {


                        for (const col of Object.keys(response.data[0])) {
                            var dates = []
                            for (const date of Object.keys(response.data[0][col]).slice(7)) {
                                var dateObj = new Date(date)
                                dates.push((dateObj.getMonth()+1) + '/' + dateObj.getDate())
                            }

                        commit('SET_DATE_RANGE', dates)
                        plot_data.push(
                            {
                                y: sma(Object.values(response.data[0][col]), 7),
                                x: dates,
                                type: "line",
                                name: col,
                                xaxis: 'x',
                                yaxis: 'y'
                            }
                        )
                        }
                    }
                })


            commit('SET_PLOT_DATA', plot_data)

            commit('SET_PLOT_LAYOUT', {
                title: {
                    // y : 1,
                    text: state.targetDataType === 'p_scores' ? 'P Score by age categories' : 'Mortality in different years',
                    size: 15,
                },
                showlegend: true,
                autosize: true,
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
                    range: [state.plot.dateRange.length - 14, state.plot.dateRange.length -1],
                },
                yaxis: {
                    ticks: 'outside',
                    title: state.targetDataType === 'p_scores' ? 'P scores (%, percent)' : 'population (people)',
                    color: '#000',
                    anchor: 'x',
                    match: 'y',
                    rangemode: 'tozero',
                    overlaying: 'y',
                    side: 'left'
                },
                margin: {
                    l: 80,
                    r: 80,
                    t: 30,
                    b: 30,
                },
            })
            commit('SET_LOADING', false)
        },
    },

}