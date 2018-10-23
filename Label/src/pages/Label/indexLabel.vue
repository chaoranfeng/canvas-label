<template>
  <div class="root">
    <nav-top></nav-top>
    <div class="Label_container clearfix">
      <div class="middle">middle</div>
      <nav-left></nav-left>
      <nav-right></nav-right>
    </div>
  </div>
</template>

<script>
import NavTop from './components/NavTop'
import NavLeft from './components/NavLeft'
import NavRight from './components/NavRight'
export default {
  name: 'IndexLabel',
  components: {
    NavTop,
    NavLeft,
    NavRight
  }
}
</script>

<style>

</style>
