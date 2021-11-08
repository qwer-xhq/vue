export default {
  namespaced:true,
  state: {
    sum:0,
    school:'尚硅谷',
    object:'vue'
  },
  actions: {
    incrementOdd(context,value){
      if(context.state.sum%2){
        context.commit('INCREMENTODD',value)
      }
    },
    incrementWait(context,value){
      setTimeout(() => {
        context.commit('INCREMENTWAIT',value)
      }, 500);
    }
  },
  mutations: {
    INCREMENT(state,value){
      state.sum+=value
    },
    DECREMENT(state,value){
      state.sum-=value
    },
    INCREMENTODD(state,value){
      state.sum+=value
    },
    INCREMENTWAIT(state,value){
      state.sum+=value
    }
  },
  getters: {
    bigSum(state){
      return state.sum*10
    }
  },
}