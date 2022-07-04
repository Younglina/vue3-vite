<template>
  <div class="list-contan">
    <div
      :style="{ backgroundImage: `url(${playlistInfo.coverImgUrl + '?param=224y224'})` }"
      class="list-img"
    ></div>
    <div class="list-info">
      <div class="list-name">{{ playlistInfo.name }}</div>
      <div class="flex-align">
        <img class="list-creator" :src="playlistInfo.creator?.avatarUrl" alt />
        <span
          class="list-creator-name"
          @click="toCreator(playlistInfo.creator?.userId)"
          >{{ playlistInfo.creator?.nickname }}</span
        >
      </div>
      <div>
        更新于{{ formatDate(playlistInfo.trackUpdateTime) }} ·
        {{ playlistInfo.trackCount }}首歌
      </div>
      <div class="list-desc">{{ playlistInfo.description }}</div>
      <div class="flex-align list-btns">
        <div class="list-btns_play">
          <div class="i-mdi-play text-18px" ></div>
          <span>播放</span>
        </div>
          <div class="i-mdi-cards-heart-outline text-18px"></div>
          <div class="i-mdi-heart text-18px bg-rose"></div>
      </div>
    </div>
  </div>
  <div class="flex">
    <div class="list-songlist">
      <div class="title">歌单列表</div>
      <SongList :id="playlistId"></SongList>
    </div>
    <div class="list-subscribers">
      <div class="title">近期收藏</div>
      <div
        v-for="item in playlistInfo.subscribers"
        :key="item.userId"
        class="list-subs"
      >
        <img :src="item.avatarUrl" class="list-subs_avatar" />
        <div class="list-subs_info">
          <div>{{ item.nickname }}</div>
          <div class="list-subs_signature">{{ item.signature }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPlaylistDetail } from '@/api/music.js'
import { formatDate } from '@/utils/useTool.js'
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import SongList from '@/components/SongList.vue'

onBeforeMount(() => {
  initData()
})

const route = useRoute()
const playlistId = ref(null)
const playlistInfo = ref({})

const initData = async () => {
  playlistId.value = route.params.id
  const { playlist } = await getPlaylistDetail({ id: playlistId.value })

  playlistInfo.value = playlist
}
</script>

<style lang="scss" scoped>
.list-contan {
  padding: 40px 0;
  display: flex;
  .list-img {
    position: relative;
    border-radius: 10px;
    min-width: 280px;
    min-height: 280px;
    background-size: 100% 100%;
    border-radius: 10px;
    &::after {
      content: '';
      position: absolute;
      top: 4%;
      left: 0%;
      width: 100%;
      height: 100%;
      background: inherit;
      background-size: 100% 100%;
      border-radius: 10px;
      transform: scale(1.01);
      filter: blur(10px) opacity(0.5);
      z-index: -1;
    }
  }
  .list-info {
    flex: 1;
    padding-left: 50px;
    font-size: 14px;
    color: var(--color-subtest);
  }
  .list-name {
    font-size: 28px;
    font-weight: bold;
    padding: 20px 0;
    color: #000;
  }
  .list-desc {
    padding-top: 20px;
    color: var(--color-subtest);
  }
  .list-creator {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .list-creator-name {
    padding-left: 5px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .list-btns {
    padding-top: 40px;
    font-size: 16px;
    color: var(--color-text-blue);
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 8px;
      padding: 8px;
      margin-right: 12px;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.05);
      }
      &:active {
        transform: scale(0.92);
      }
    }
    div.list-btns_play {
      background-color: var(--color-bg-blue);
      span {
        margin-left: 10px;
      }
    }
  }
}
.list-songlist,
.list-subscribers {
  padding: 10px;
  border-radius: 10px;
  box-shadow: 13px 13px 24px #e6e6e6, -13px -13px 24px #ffffff;
}
.list-songlist {
  flex: 1;
}
.list-subscribers {
  margin-left: 20px;
  background: #ffffff;
  width: 260px;
  overflow: hidden;
  box-shadow: 13px 13px 24px #e6e6e6, -13px -13px 24px #ffffff;
}
.list-subs {
  display: flex;
  font-size: 14px;
  padding-bottom: 10px;
  &_avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &_info {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &_signature {
    font-size: 12px;
    color: val(--color-subtest);
  }
}
</style>