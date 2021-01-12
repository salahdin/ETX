import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        select: {
            currency: "USD",
            price_min: 0,
            price_max: 53,
            name: "US Dollar",
          },
    },
    mutations: {
        setSelect(state,payload){
            state.select = payload
        }
    },
    actions: {

    },
    getters: {
        getSelect(state){
            return state.select
        }
        
    },


})