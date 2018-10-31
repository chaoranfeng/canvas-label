<template>
  <div class="root">
    <nav-top></nav-top>
    <div class="Label_container clearfix">
      <nav-middle></nav-middle>
      <nav-left></nav-left>
      <nav-right></nav-right>
    </div>
  </div>
</template>

<script>
import NavTop from './components/NavTop'
import NavLeft from './components/NavLeft'
import NavMiddle from './components/NavMiddle'
import NavRight from './components/NavRight'
import {InitWH} from '@/assets/js/InitClientWh.js'
import {getDom} from 'common/js/Assistant.js'

export default {
  name: 'IndexLabel',
  data () {
    return {
    }
  },
  created () {
    console.log("%cdecision by chaoranfeng","background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:2em")
  },
  mounted () {
    InitWH('canvas', 'middle');
    InitWH('graph', 'middle');
    this.notify();
  },
  methods:{
     notify() {
        this.$notify({
          title: '提示',
          message: '操作图形，需要先点击左侧的操作按钮，才可以操作对应的图形(矩形或多边形哦)',
          duration: 6000
        });
      }
  },
  components: {
    NavTop,
    NavLeft,
    NavRight,
    NavMiddle
  }
}
</script>

<style>

</style>
