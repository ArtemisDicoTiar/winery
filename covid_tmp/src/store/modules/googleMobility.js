import axios from 'axios'
var sma = require('sma');

function getDataByColFrom(data, targetCol){
    var row_vals = []
    for (const row of data) {
        row_vals.push(row[targetCol])
    }
    return row_vals
}

export default {
    namespaced: true,
    state: {
        loading: false,
        isMA: 0,

        plot: {
            dateRange: [],
            data: [],
            layout: {}
        },

        region_map: {},

        target_region_table_code: '',

        data: {
            retailRecreationData: [],
            groceryPharmacyData: [],
            parksData: [],
            transitStationData: [],
            workplacesData: [],
            residentialData: [],
        },

    },
    getters: {
        GET_LOADING: (state) => {return state.loading},
        GET_REGION_MAP: (state) => {return state.region_map},

        GET_TARGET_REGION_TABLE_CODE: (state) => {return state.target_region_table_code},
        GET_REGION_INFO: (state) => {return state.region_info},

        GET_DATA: (state) => {return state.data},

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false
            state.isMA = 0
            state.plot.data = []
            state.plot.layout = {}

            state.region_map = {}
            state.target_region_table_code = ''

            state.data = {}

        },
        SET_LOADING: (state, status) => { state.loading = status },
        SET_MA: (state, status) => { state.isMA = status },

        SET_DATE_RANGE: (state, data) => {state.plot.dateRange = data},

        SET_PLOT_DATA: (state, data) => {state.plot.data = data},

        SET_PLOT_LAYOUT: (state, infos) => {state.plot.layout = infos},

        SET_REGION_MAP: (state, info) => { state.region_map = info },

        SET_TARGET_REGION_TABLE_CODE: (state, info) => { state.target_region_table_code = info},

        SET_RETAIL_DATA: (state, data) => { state.data.retailRecreationData = data},
        SET_GROCERY_DATA: (state, data) => { state.data.groceryPharmacyData = data},
        SET_PARK_DATA: (state, data) => { state.data.parksData = data},
        SET_TRANSIT_DATA: (state, data) => { state.data.transitStationData = data},
        SET_WORK_DATA: (state, data) => { state.data.workplacesData = data},
        SET_RESIDENT_DATA: (state, data) => { state.data.residentialData = data},

        SET_DATA: (state, info) => { state.data = info },

    },
    actions: {
        GET_REGION_LIST: async ({commit}) => {
            // commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_API + `/google/mobility/regions`

            await axios.get(targetLink, { params: {offset: 0, size: 140} })
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        var data = response.data;
                        data.sort(function(a, b){
                            var nameA = a.name.toUpperCase();
                            var nameB = b.name.toUpperCase();
                            if (nameA < nameB) { return -1; }
                            if (nameA < nameB) { return 1; }
                            return 0;
                        })
                        var regionMap = {};
                        for (const row of data) {
                            regionMap[row['name']] = row['table_name']
                        }

                        commit('SET_REGION_MAP', regionMap)
                    }
                })
        },
        GET_REGION_DATA: async ({commit, state}) => {
            commit('SET_LOADING', true)

            var totalData = {}
            let targetLink = process.env.VUE_APP_API + `/google/mobility/data/${state.target_region_table_code}`
            await axios.get(targetLink, { params: {offset: 0, size: 10000} })
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        totalData = response.data
                    }
                })

            var dates = []
            for (const date of getDataByColFrom(totalData, 'date')) {
                dates.push(new Date(date))
            }

            if (state.isMA == 0) {
                commit('SET_DATE_RANGE', dates)
                commit('SET_RETAIL_DATA', getDataByColFrom(totalData, 'retail_and_recreation_percent_change_from_baseline'))
                commit('SET_GROCERY_DATA', getDataByColFrom(totalData, 'grocery_and_pharmacy_percent_change_from_baseline'))
                commit('SET_PARK_DATA', getDataByColFrom(totalData, 'parks_percent_change_from_baseline'))
                commit('SET_TRANSIT_DATA', getDataByColFrom(totalData, 'transit_stations_percent_change_from_baseline'))
                commit('SET_WORK_DATA', getDataByColFrom(totalData, 'workplaces_percent_change_from_baseline'))
                commit('SET_RESIDENT_DATA', getDataByColFrom(totalData, 'residential_percent_change_from_baseline'))

            } else {
                commit('SET_DATE_RANGE', dates.slice(state.isMA))
                commit('SET_RETAIL_DATA', sma(getDataByColFrom(totalData, 'retail_and_recreation_percent_change_from_baseline'), state.isMA))
                commit('SET_GROCERY_DATA', sma(getDataByColFrom(totalData, 'grocery_and_pharmacy_percent_change_from_baseline'), state.isMA))
                commit('SET_PARK_DATA', sma(getDataByColFrom(totalData, 'parks_percent_change_from_baseline'), state.isMA))
                commit('SET_TRANSIT_DATA', sma(getDataByColFrom(totalData, 'transit_stations_percent_change_from_baseline'), state.isMA))
                commit('SET_WORK_DATA', sma(getDataByColFrom(totalData, 'workplaces_percent_change_from_baseline'), state.isMA))
                commit('SET_RESIDENT_DATA', sma(getDataByColFrom(totalData, 'residential_percent_change_from_baseline'), state.isMA))

            }


            commit('SET_PLOT_DATA',
                [
                    {
                        y: state.data.retailRecreationData,
                        x: state.plot.dateRange,
                        mode: 'lines',
                        type: "scatter",
                        name: 'Retail and Recreation'
                    },{
                        y: state.data.groceryPharmacyData,
                        x: state.plot.dateRange,
                        mode: 'lines',
                        type: "scatter",
                        name: 'Grocery and Pharmacy'
                    },{
                        y: state.data.parksData,
                        x: state.plot.dateRange,
                        mode: 'lines',
                        type: "scatter",
                        name: 'Parks'
                    },{
                        y: state.data.transitStationData,
                        x: state.plot.dateRange,
                        mode: 'lines',
                        type: "scatter",
                        name: 'Transit Stations'
                    },{
                        y: state.data.workplacesData,
                        x: state.plot.dateRange,
                        mode: 'lines',
                        type: "scatter",
                        name: 'Workplace'
                    },{
                         y: state.data.retailRecreationData,
                         x: state.plot.dateRange,
                         mode: 'lines',
                         type: "scatter",
                         name: 'Residential'
                     }
                ]
            )

            commit('SET_PLOT_LAYOUT', {
                title: {
                    text: 'Google Mobility Report',
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
//                     autorange: true,
                    ticks: 'outside',
                    type: "date",
                    tickcolor: '#000',
//                     range: [state.plot.dateRange[state.plot.dateRange.length - 28], state.plot.dateRange[state.plot.dateRange.length-1]]
                },
                yaxis: {
                    ticks: 'outside',
                    title: 'Percentage Change from BaseLine',
                },
                margin: {
                    l: 80,
                    r: 30,
                    t: 30,
                    b: 150,
                },
            })
            commit('SET_LOADING', false)
        },

    },

}