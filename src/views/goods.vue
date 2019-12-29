<template>
  <div>
    <!-- 头部栏 -->
    <Heador />
    <!-- 底部栏 -->
    <Footor />
  </div>
</template>

<script>
import Heador from '../components/header.vue'
import Footor from '../components/footer.vue'
export default {
  components: {
    Heador,
    Footor
  }
}
</script>

<style lang='scss'>

</style>
