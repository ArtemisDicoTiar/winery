import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,

        baseAreas: {},

        plot: {
            dateRange: [],
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

        SET_DATE_RANGE: (state, status) => {state.plot.dateRange = status},

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
            commit('SET_DATE_RANGE',
                [state.data.date[state.data.date.length - 28], state.data.date[state.data.date.length - 1]])

            commit('SET_LOADING', false)
            commit('SET_PLOT_DATA',
                [
                    {
                        y: state.data.confirmedDaily,
                        x: state.data.date,
                        marker: {color: '#FF6FA9'},
                        type: "bar",
                        name: 'Conf Dly',
                        xaxis: 'x',
                        yaxis: 'y'
                    },{
                        y: state.data.confirmedCumulative,
                        x: state.data.date,
                        mode: 'lines',
                        marker: {color: '#000'},
                        type: "scatter",
                        name: 'Conf Cuml',
                        xaxis: 'x',
                        yaxis: 'y2'
                    },{
                        y: state.data.cumDeaths28DaysByDeathDate,
                        x: state.data.date,
                        marker: {color: '#620042'},
                        type: "bar",
                        name: 'CumlD/DD',
                        xaxis: 'x2',
                        yaxis: 'y3'
                    },{
                        y: state.data.cumDeaths28DaysByDeathDateRate,
                        x: state.data.date,
                        mode: 'lines',
                        marker: {color: '#000'},
                        type: "scatter",
                        name: 'CumlD/DR',
                        xaxis: 'x2',
                        yaxis: 'y4'
                    },{
                        y: state.data.cumDeaths28DaysByPublishDate,
                        x: state.data.date,
                        marker: {color: '#1F77B4'},
                        type: "bar",
                        name: 'CumlD/PD',
                        xaxis: 'x3',
                        yaxis: 'y5'
                    }, {
                        y: state.data.cumDeaths28DaysByPublishDateRate,
                        x: state.data.date,
                        mode: 'lines',
                        marker: {color: '#72B7B2'},
                        type: "scatter",
                        name: 'CumlD/PR',
                        xaxis: 'x3',
                        yaxis: 'y6'
                    },{
                        y: state.data.newDeaths28DaysByPublishDate,
                        x: state.data.date,
                        marker: {color: '#69173A'},
                        type: "bar",
                        name: 'NewD/PD',
                        xaxis: 'x4',
                        yaxis: 'y7'
                    },
                ]
            )

            commit('SET_PLOT_LAYOUT', {
                annotations: [
                    {
                        x: "2020-09-28",
                        y: 0,
                        text: "Most University Starts 20/21 Academic year",
                        showarrow: true,
                        arrowhead: 10,
                        ax: 0,
                        ay: -100
                    },
                    {
                        x: "2020-11-05",
                        y: 0,
                        text: "UK national Lockdown",
                        showarrow: true,
                        arrowhead: 10,
                        ax: 0,
                        ay: -50
                    },
                    {
                        x: "2020-12-08",
                        y: 0,
                        text: "UK COVID Vaccination Start",
                        showarrow: true,
                        arrowhead: 10,
                        ax: 0,
                        ay: -50
                    }
                ],
                title: {
                    y : -2,
                    text: state.target.areaName,
                    size: 15,
                },
                showlegend: false,
                height: 2000,
                autosize: true,
                margin: {
                    l: 65,
                    r: 65,
                    t: 100,
                },
                grid: {
                    rows: 4,
                    columns: 1,
                    pattern: 'independent',

                    subplots:[['x4y7'], ['x3y5'], ['x2y3'], ['xy']],
                    roworder:'bottom to top'
                },

                xaxis: {
                    ticks: 'outside',
                    tickcolor: '#000',
                    range: state.plot.dateRange,
                },
                yaxis: {
                    ticks: 'outside',
                    title: 'Daily Confirmed',
                    color: '#FF6FA9'
                },
                yaxis2: {
                    ticks: 'outside',
                    title: 'Cumulative Confirmed',
                    color: '#000',
                    anchor: 'x',
                    match: 'y',
                    rangemode: 'tozero',
                    overlaying: 'y',
                    side: 'right'
                },

                xaxis2: {
                    autotick: true,
                    ticks: 'outside',
                    range: state.plot.dateRange,
                    tickcolor: '#000'
                },
                yaxis3: {
                    autotick: true,
                    ticks: 'outside',
                    title: 'Cumulative Deaths per DeathDate in 28days',
                    rangemode: 'tozero',
                    color: '#620042'
                },
                yaxis4: {
                    autotick: true,
                    ticks: 'outside',
                    title: 'Rate of Cumulative Deaths per DeathDate in 28days',
                    color: '#000',
                    anchor: 'x2',
                    match: 'y3',
                    rangemode: 'tozero',
                    overlaying: 'y3',
                    side: 'right'
                },

                xaxis3: {
                    autotick: true,
                    ticks: 'outside',
                    range: state.plot.dateRange,
                    tickcolor: '#000'
                },
                yaxis5: {
                    autotick: true,
                    ticks: 'outside',
                    title: 'Cumulative Deaths per PublishDate in 28days',
                    color: '#1F77B4',
                    rangemode: 'tozero',
                    tickcolor: '#000'
                },
                yaxis6: {
                    autotick: true,
                    ticks: 'outside',
                    title: 'Rate of Cumulative Deaths per PublishDate in 28days',
                    color: '#000',
                    anchor: 'x3',
                    match: 'y5',
                    rangemode: 'tozero',
                    overlaying: 'y5',
                    side: 'right'
                },

                xaxis4: {
                    autotick: true,
                    ticks: 'outside',
                    range: state.plot.dateRange,
                    tickcolor: '#000'
                },
                yaxis7: {
                    autotick: true,
                    ticks: 'outside',
                    title: 'New Deaths per PublishDate in 28days',
                    color: '#69173A',
                    rangemode: 'tozero',
                    tickcolor: '#000'
                },

            })


        },
    },

}