import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from '../state/modules/user.js'
import goods from '../state/modules/goods.js'
import work from '../state/modules/work.js'

const state = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
		user,
		goods,
        work
    }
});

export default state;
