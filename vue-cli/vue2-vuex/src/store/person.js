import axios from 'axios'
export default {
  namespaced:true,
  state: {
    personList:[
      {id:'001',name:'张三',description:'无'}
    ]
  },
  actions: {
    addPerson(context,person){
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
        response => {
          context.commit('ADDPERSON',{...person,description:response.data})
        },
        error => {
          console.log(error.message);
        }
      )
    },
    addPersonWang(context,person){
      if(person.name.indexOf('王') === 0){
        context.commit('ADDPERSON',person)
      }else{
        alert('必须添加一个姓王的人！')
      }
    }
  },
  mutations: {
    ADDPERSON(state,person){
      state.personList.unshift(person)
    }
  },
  getters: {
    firstListName(state){
      return state.personList[0].name
    }
  },
}