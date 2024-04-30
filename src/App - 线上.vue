<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/nav.vue'

</script>
示意地址：
https://demo.bootstrapdash.com/majestic-free/template/pages/ui-features/buttons.html


<template>
  <Nav></Nav>
  <header class="bg-light mx-3">
    <div class="row"> 
      <img alt="logo" class="logo" src="/logo.png"/>

      <div class="wrapper">
        <HelloWorld class="text-secondary" msg="" />

        <nav>
          <RouterLink to="/">DeepLink工具</RouterLink>
          <RouterLink to="/about">关于</RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  min-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 160px;
  height: 42px;
  padding: 0;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    /*padding-right: calc(var(--section-gap) / 3);*/
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
