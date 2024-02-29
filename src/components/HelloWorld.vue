<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 >{{ msg }}</h1>
    <h3>
      vivo社区工具集
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  display: block;
  width: 100%;
  text-align: center;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

</style>
