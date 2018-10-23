import Vue from 'vue'
import Router from 'vue-router'
import IndexLabel from 'pages/Label/IndexLabel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexLabel',
      component: IndexLabel
    }
  ]
})
