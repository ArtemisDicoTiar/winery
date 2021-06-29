import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,
        longLat: {},

        continents: {},
        countries: {},
        sub_divisions: {},

        continent: '',
        country: {},
        sub_division: {}
    },
    getters: {
        GET_LOADING: (state) => {return state.loading},

        GET_CONTINENTS: (state) => {return state.continents},
        GET_COUNTRIES: (state) => {return state.countries},
        GET_SUBDIVISIONS: (state) => {return state.sub_divisions},

        GET_CONTINENT: (state) => {return state.continent},
        GET_COUNTRY: (state) => {return state.country},
        GET_SUBDIVISION: (state) => {return state.sub_division},

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.continents = {}
            state.countries = {}
            state.sub_divisions = {}

            state.continent = ''
            state.country = ''
            state.sub_division = ''
        },

        SET_LOADING: (state, status) => {state.loading = status},

        SET_LONGLAT: (state, info) => {state.longLat = info},

        SET_CONTINENTS: (state, region) => {state.continents = region},
        SET_COUNTRIES: (state, region) => {state.countries = region},
        SET_SUBDIVISIONS: (state, region) => {state.sub_divisions = region},

        SET_CONTINENT: (state, region) => {state.continent = region},
        SET_COUNTRY: (state, region) => {state.country = region},
        SET_SUBDIVISION: (state, region) => {state.sub_division = region},

    },
    actions: {
        REQUEST_CONTINENTS: async ({commit}) => {
            commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_DJANGO_API + '/region/global/continent_list'

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_CONTINENTS', response.data)
                        commit('SET_LOADING', false)
                    }
                })
        },
        REQUEST_COUNTRIES: async ({commit, state}) => {
            commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_DJANGO_API + `/region/global/country_list`

            await axios.get(targetLink, {params: {continent: state.continent}})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_COUNTRIES', response.data)
                        commit('SET_LOADING', false)
                    }
                })
        },
        REQUEST_UK_REGIONS: async ({commit}) => {
            commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_DJANGO_API + `/region/uk/region_list`

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        response.data.unshift({ name: 'All', code: 'all' })
                        commit('SET_SUBDIVISIONS', response.data)
                        commit('SET_LOADING', false)
                    }
                })
        },
        REQUEST_REGION_FROM_LOCATION: async ({commit, state}) => {
            commit('SET_LOADING', true)
            let targetLink = process.env.VUE_APP_DJANGO_API + `/region/geoapi/search`

            await axios.get(targetLink,
                {params: {lat: state.longLat.lat, long: state.longLat.long}})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_CONTINENT', response.data.continent)
                        commit('SET_COUNTRY',
                            [response.data.country].map(x=>({
                                'code':x.code,
                                'name':x.name,
                                'toLowerCase':()=>x.name.toLowerCase(),
                                'toString':()=>x.name
                            }))[0]
                        )
                        commit('SET_SUBDIVISION',
                            [response.data.sub_region].map(x=>({
                                'code':x.code,
                                'name':x.name,
                                'toLowerCase':()=>x.name.toLowerCase(),
                                'toString':()=>x.name
                            }))[0]
                        )
                        commit('SET_LOADING', false)
                    }
                })
        },
        // REQUEST_DATA
    },

}