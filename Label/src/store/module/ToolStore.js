export default {
  state:{
     toolActive:''
  },
  mutations:{
      changeActive(state,value){
          state.toolActive = value;
      }
  }
  /*actions:{
      loading_action(context){//这里的context和我们使用的$store拥有相同的对象和方法
          context.commit('switch_loading');
          //你还可以在这里触发其他的mutations方法
      },
  }*/
}