<template>
  <div class="link-to">
    <div v-for="item in itemArray" :key="item.id" @click="linkTo">
      {{ item.name }}
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  items: Array,
})
const itemArray = computed(() => {
  return Array.isArray(props.items) ? props.items : [props.items]
})

const router = useRouter()
const linkTo = () => {
  router.push({ name: 'Home' })
}
</script>
<style lang="scss">
.link-to {
  display: flex;
  > div {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  div + div {
    &::before {
      content: ',';
      padding: 0 2px;
    }
  }
}
</style>