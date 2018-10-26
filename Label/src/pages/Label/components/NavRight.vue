<template>
  <div class="right">
    <p class="info_title">标注状态记录</p>
    <ul>
      <li v-for="(info, index) of this.signInfo"
         :key="info.id"
         :id="info.id" class="infoList"
         :title="info.classify"
         @mouseover="mouseover($event)" 
         @mouseleave="mouseleave($event)"
         >{{index+1}}.{{info.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations} from "vuex"
export default {
  name: 'NavRight',
  computed:{
    ...mapState({
      signInfo(state) {
        return state.Info.signInfo;
      }
    })
  },
  methods: {
    ...mapMutations(['changeSelect']),
    mouseover(event) {
      const id= event.target.getAttribute('id');
      if(id){
        this.changeSelect(id)
      }
    },
    mouseleave(event){
      this.changeSelect('')
    }
  }
};
</script>

<style scoped>
  ul{
    padding: 20px;
  }
  .infoList{
    color: #f6d9cc;
    width: 100%;
    padding-bottom: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .info_title{
    text-align: center;
    padding: 10px;
    background: #818187;
    color: #dde2ec;
  }
</style>
