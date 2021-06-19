import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		id: 4,
	},
	mutations: {
		cambiarId(state, payload) {
			state.id = payload;
		},
	},
	actions: {
		login({ commit }, id) {
			commit('cambiarId', id);
		},
	},
	modules: {},
});
