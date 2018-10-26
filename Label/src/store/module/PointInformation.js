export default {
    state: {
        signInfo: [],
        selectInfo: ''
    },
    mutations: {
        addSignInfo(state, value) {
            state.signInfo.push(value);
        },
        changeSelect(state, value) {
            state.selectInfo = value;
        }
    }
    /*actions:{
        loading_action(context){//这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('switch_loading');
            //你还可以在这里触发其他的mutations方法
        },
    }*/
}