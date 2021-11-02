import axios from "axios";

export default {
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
  },
}