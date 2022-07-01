<template>
  <div class="song-list">
    <div
      v-for="item in props.cards"
      :key="item.id"
      class="song-card"
      @click="toDetail(item.id)"
    >
      <div class="song-card_cover">
        <img class="song-card_img" :src="item.picUrl + '?param=224y224'" />
        <div class="play-icon-contan">
          <div class="i-mdi-play text-3xl"></div>
        </div>
        <span class="song-card_playcount">{{ item.playCount }}</span>
      </div>
      <div class="song-card_name">{{ item.name }}</div>
      <div class="song-card_footer">{{ item.copywriter }}</div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
})
const router = useRouter()
const toDetail = id => {
  router.push({ name: 'Info', params: { id } })
}
</script>
<style lang="scss" scoped>
.song-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  padding-bottom: 30px;
  .play-icon-contan {
    position: absolute;
    visibility: hidden;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 50%;
    transition: all 0.3s;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    .play-icon {
      width: 35px;
      height: 35px;
      padding-right: 2px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(4px);
      z-index: -1;
    }
  }
}
.song-card {
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.02);
  }
  &_cover {
    position: relative;
    &:hover .play-icon-contan {
      visibility: visible;
    }
  }
  &_name {
    font-size: 16px;
    padding-bottom: 5px;
    font-weight: bold;
  }
  &_img {
    width: 100%;
    border-radius: 5px;
    border-radius: 5px;
    background: linear-gradient(315deg, #ffffff, #e6e6e6);
    box-shadow: -6px -6px 20px #cfcfcf, 6px 6px 20px #ffffff;
    margin-bottom: 8px;
  }
  &_playcount {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
  }
  &_footer {
    color: #666;
  }
}
</style>