

export default {
    namespaced: true,

    state: {
        appDrawerVisible: false
    },
    getters: {
        GET_APP_DRAWER_VISIBLE: (state) => {return state.appDrawerVisible}

    },
    mutations: {
        SET_APP_DRAWER_VISIBLE: (state, status) => {state.appDrawerVisible = status}
    },
    actions: {

    }

}