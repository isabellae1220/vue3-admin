<template>
  <div class="not-found">
    <img :src="getImageUrl('404')" alt="404" />
  </div>
</template>

<script lang="ts" setup>
const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}.png`, import.meta.url).href
}
</script>

<style scoped>
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  max-width: 600px;
  width: 100%;
}
</style>