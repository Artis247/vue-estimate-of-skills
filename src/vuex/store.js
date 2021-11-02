import { createStore } from "vuex" 
import axios from "axios"




const store = createStore({
  state: {
    isMobile: false,
    isDesktop: true,
    tests: []
    
  },
  mutations: {
    SWITCH_MOBILE: (state) => {
        state.isMobile = true;
        state.isDesktop = false;
      },
      SWITCH_DESKTOP: (state) => {
        state.isMobile = false;
        state.isDesktop = true;
      },
      SET_TESTS_TO_STATE: (state, tests) => {
        state.tests = tests;
        
      }
  },
  actions: {
    SET_MOBILE({commit}) {
      commit('SWITCH_MOBILE')
    },
    SET_DESKTOP({commit}) {
      commit('SWITCH_DESKTOP')
    },
    GET_TESTS_FROM_API({commit}) {
        return axios('http://localhost:3000/tests', {
          method: "GET"
        })
          .then((tests) => {
            commit('SET_TESTS_TO_STATE', tests.data);
            
            return tests;
          })
          .catch((error) => {
            console.log(error)
            return error;
          })
      }
  },
  getters: {
    IS_MOBILE(state) {
        return state.isMobile;
      },
      IS_DESKTOP(state) {
        return state.isDesktop;
      },
      TESTS(state) {
        return state.tests;
      }
  }
});

export default store;