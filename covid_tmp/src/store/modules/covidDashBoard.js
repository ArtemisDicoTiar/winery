import axios from 'axios'

export default {
    namespaced: true,
    state: {
        loading: false,

        area_type: '',
        target: '',
        data: {

        }

    },
    getters: {
        GET_LOADING: (state) => {return state.loading},

        GET_AREA_TYPE: (state) => {return state.area_type},
        GET_TARGET: (state) => {return state.target},

        GET_DATA: (state) => {return state.data}

    },
    mutations: {
        SET_CLEAR: (state) => {
            state.loading = false

            state.target = ''
            state.area_type = ''

            state.data = {}

        },

        SET_LOADING: (state, status) => { state.loading = status },
        SET_AREA_TYPE: (state, info) => { state.area_type = info },
        SET_TARGET: (state, info) => { state.target = info },

        SET_DATA: (state, info) => { state.data = info }

    },
    actions: {
        GET_DASHBOARD: async ({commit, state}) => {
            commit('SET_LOADING', true)
            let targetLink = ''

            if (state.area_type === 'global') {
                targetLink = process.env.VUE_APP_API + `/covid/glob/${state.target}/dashboard`
            } else if (state.area_type === 'uk') {
                targetLink = process.env.VUE_APP_API + `/covid/uk/${state.target}/dashboard`
            } else {
                alert('AREA TYPE ERROR (PAGE SECTION ERROR')
            }

            await axios.get(targetLink, {})
                .then(function (response) {
                    if (response.status !== 200) {
                        alert('ERROR: ' + response)
                    } else {
                        commit('SET_DATA', response.data)
                        commit('SET_LOADING', false)
                    }
                })
        },
    },

}