import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,

        plot: {
            dateRange: [],
            data: [],
            newData: [],
            cumData: [],
            layout: {}
        },

        region_map: {},

        target_region_code: '',
        region_info: {},

        fully_dosed: false,
        data: {

        },

    },
    getters: {
        GET_LOADING: (state) => {return state.loading},
        GET_REGION_MAP: (state) => {return state.region_map},
        GET_TIMESTAMP: (state) => {return state.data.timeStamp},

        GET_TARGET_REGION_CODE: (state) => {return state.target_region_code},
        GET_REGION_INFO: (state) => {return state.region_info},

        GET_FULLY_DOSED: (state) => {return state.fully_dosed},

        GET_DATA: (state) => {return state.data},

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.plot.data = []
            state.plot.newData = []
            state.plot.cumData = []
            state.plot.layout = {}

            state.region_map = {}
            state.target_region_code = ''
            state.region_info = {}

            state.fully_dosed = false

            state.data = {}

        },
        SET_LOADING: (state, status) => { state.loading = status },

        SET_DATE_RANGE: (state, status) => {state.plot.dateRange = status},

        SET_PLOT_DATA: (state, data) => {state.plot.data = data},
        SET_PLOT_NEWDATA: (state, data) => {state.plot.newData= data},
        SET_PLOT_CUMDATA: (state, data) => {state.plot.cumData = data},

        SET_PLOT_LAYOUT: (state, infos) => {state.plot.layout = infos},

        SET_REGION_MAP: (state, info) => { state.region_map = info },

        SET_TARGET_REGION_CODE: (state, info) => { state.target_region_code = info},
        SET_REGION_INFO: (state, info) => { state.region_info = info },

        SET_FULLY_DOSED: (state, info) => { state.fully_dosed = info },

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
            let regionName = String(Object.keys(state.region_map).find(key => state.region_map[key] === state.target_region_code))
            let targetLink = process.env.VUE_APP_API +
                `/owid/vaccination/regions/${regionName}`

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_REGION_INFO', response.data[0])
                        console.log(state.region_info)
                        // commit('SET_LOADING', false)
                    }
                })
        },
        GET_REGION_DATA: async ({commit, state}) => {
            commit('SET_LOADING', true)
            var newCount = 'new'
            var cumCount = 'cum'
            if (state.fully_dosed) {
                newCount = 'fully_' + newCount
                cumCount = 'fully_' + cumCount
            }
            let newTargetLink = process.env.VUE_APP_API + `/owid/vaccination/${newCount}/${state.target_region_code}`
            await axios.get(newTargetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_DATE_RANGE', Object.keys(response.data))
                        commit('SET_PLOT_NEWDATA', Object.values(response.data))
                    }
                })

            let cumTargetLink = process.env.VUE_APP_API + `/owid/vaccination/${cumCount}/${state.target_region_code}`
            await axios.get(cumTargetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_PLOT_CUMDATA', Object.values(response.data))
                    }
                })

            commit('SET_PLOT_DATA',
                [
                    {
                        y: state.plot.newData,
                        x: state.plot.dateRange,
                        marker: {color: '#1F77B4',},
                        type: "bar",
                        name: 'Daily Vaccinated',
                        xaxis: 'x',
                        yaxis: 'y'
                    },{
                        y: state.plot.cumData,
                        x: state.plot.dateRange,
                        marker: {color: '#000'},
                        mode: 'line',
                        type: "lines",
                        name: 'Cumulative Vaccinated',
                        xaxis: 'x',
                        yaxis: 'y2'
                    }
                ]
            )

            commit('SET_PLOT_LAYOUT', {
                title: {
                    // y : 1,
                    text: state.query_data_type,
                    size: 15,
                },
                showlegend: false,
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
                    range: [state.plot.dateRange[state.plot.dateRange.length - 14], state.plot.dateRange[state.plot.dateRange.length - 1]],
                },
                yaxis: {
                    ticks: 'outside',
                    title: 'Daily Count',
                    color: '#1F77B4',
                },
                yaxis2: {
                    ticks: 'outside',
                    title: 'Cumulative Count',
                    color: '#000',
                    anchor: 'x',
                    match: 'y',
                    rangemode: 'tozero',
                    overlaying: 'y',
                    side: 'right'
                },
                margin: {
                    l: 80,
                    r: 80,
                    t: 30,
                    b: 50,
                },
            })
            commit('SET_LOADING', false)
        },

    },

}