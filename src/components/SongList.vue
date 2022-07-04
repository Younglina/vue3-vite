<template>
  <div
    v-infinite-scroll="loadmore"
    :infinite-scroll-disabled="disabled"
    class="song-list"
  >
    <div
      v-for="item in state.showList"
      :class="['playitem', currentId === item.id && 'current-song']"
      :key="item.id"
      @dblclick="handleDbclick(item)"
    >
      <img class="playitem-img" :src="item.picUrl + '?param=224y224'" alt />
      <div class="flex-auto flex-col">
        <span class="playitem-name"
          >{{ item.name }}{{ item.aliaName ? `(${item.aliaName})` : '' }}</span
        >
        <LinkTo class="playitem-singers" :items="item.singers"></LinkTo>
      </div>
      <div class="flex-auto">{{ item.alName }}</div>
      <div class="playitem-duration">{{ item.duration }}</div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed, ref, reactive, watch } from 'vue'
import { usePinia } from '@/utils/usePinia.js'

import LinkTo from '@/components/LinkTo.vue'
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: [],
  },
})

const pinia = usePinia()
onMounted(() => {
  if (props.id) {
    pinia.setSongList(props.id)
  }
})

const songlist = computed(() => {
  return props.list.length ? props.list : pinia.currentSongList
})

const state = reactive({
  showList: [],
  step: 0,
})
watch(songlist, val => {
  if (val.length) {
    state.showList = val.length >= 10 ? val.slice(0, 10) : val
  }
})
const noMore = ref(false)
const disabled = computed(() => songlist.value.length <= 10 || noMore.value)

const loadmore = () => {
  console.log(123)
  if (!songlist.value.length) return
  const step = ++state.step * 10
  state.showList = state.showList.concat(songlist.value.slice(step, step + 10))
  noMore.value = step + 10 >= songlist.value.length
}

const currentId = computed(() => {
  return pinia.currentSong?.id
})
const handleDbclick = song => {
  pinia.setCurrentSongList(songlist.value)
  // vueplayer.playSong(song)
}
</script>
<style lang="scss" scoped>
.song-list {
  height: 500px;
  overflow-y: auto;
}
.playitem {
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: var(--color-bg-gray);
  }
  &-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 8px;
  }
  &-name {
    padding-bottom: 5px;
    font-size: 16px;
    font-weight: bold;
  }
  &-singers {
    font-size: 14px;
    color: var(--color-subtest);
  }
  &-duration {
    width: 50px;
  }
}
.current-song {
  background-color: var(--color-bg-blue);
  color: var(--color-text-blue);
  .playitem-singers {
    color: var(--color-text-blue);
  }
}
</style>