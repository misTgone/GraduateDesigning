<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  updated () {
    let path = this.$route.path
    let dom = document.getElementsByClassName('nav-sub')[0]
    switch (path) {
      case '/goods':
        let ligoods = dom.getElementsByTagName('li')[1]
        ligoods.style.fontWeight = 'bold'
        break
      case '/':
        let lihome = dom.getElementsByTagName('li')[0]
        lihome.style.fontWeight = 'bold'
    }
  }
}
</script>
