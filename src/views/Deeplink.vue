<script setup>
  import PostLink from './deeplink/PostLink.vue'
  import DescLink from './deeplink/DescLink.vue'
</script>

<style type="text/css">
    .input-group-prepend {
        margin-right: -1px;
    }
    .result .form-control {
        font-size: 0.8rem;
    }
</style>

<template>
  <PostLink></PostLink>
  <DescLink></DescLink>
</template>
