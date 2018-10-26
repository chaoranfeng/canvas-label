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
  },
  mounted () {
    InitWH('canvas', 'middle');
    InitWH('graph', 'middle')
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
