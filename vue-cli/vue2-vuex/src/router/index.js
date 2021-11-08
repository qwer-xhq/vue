import Vue from 'vue'
import VueRouter from "vue-router";

import Count from "../components/Count"
import Person from "../components/Person"
Vue.use(VueRouter)
export default new VueRouter({
  mode:"history",
  routes:[
    {
      path:'/count',
      component:Count
    },
    {
      path:'/person',
      component:Person
    }
  ],
  
})
