import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import Tool from './module/ToolStore'
import Info from './module/PointInformation'
export default new vuex.Store({
    modules: {
      Tool,
      Info
    }
})