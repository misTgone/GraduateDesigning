<template>
  <div class="content">
    <div class="contentTitle">
      <p>{{ titleName }}</p>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
  .content{
      width: 1220px;
      margin: 0 auto;
    .contentTitle{
      height: 60px;
      border-bottom: 1px solid #d4d4d4;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 1px 7px rgba(0,0,0,.06);
      background: linear-gradient(#fbfbfb,#ececec);
      font-size: 18px;
      color: #333;
      > p{
        line-height: 60px;
        margin-left: 25px;
      }
    }
    >div:last-child{
      border-radius: 0 0 10px 10px;
    }
  }
</style>
