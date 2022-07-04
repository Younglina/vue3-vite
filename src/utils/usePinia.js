import { defineStore } from 'pinia'
import { getPlaylistById } from '@/api/music.js'
import { formatSongs } from '@/utils/useTool.js'

export const usePinia = defineStore('music', {
  state: () => {
    return {
      userInfo: null,
      currentSong: null,
      currentSongList: null,
      player: null,
      progress: 0,
      duration: 0,
      showLyrics: false,
      dailySong: [],
    }
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    async setSongList(id) {
      this.currentSongList = []
      const { songs } = await getPlaylistById({ id: id })
      this.currentSongList = formatSongs(songs)
    },
    setCurrentSong(state, data) {
      state.currentSong = data
    },
    setCurrentSongList(state, data) {
      state.currentSongList = data
    },
    SET_PLAYER(state, data) {
      state.player = data
    },
    setProgress(state, data) {
      state.progress = data
    },
    SET_DURATION(state, data) {
      state.duration = data
    },
    SET_SHOWLYRICS(state, data) {
      state.showLyrics = data
    },
    SET_DAILYSONG(state, data) {
      state.dailySong = data
    },
  },
  getters: {
    // userInfo(state) {
    //   return state.userInfo
    // },
    // currentSong(state) {
    //   return state.currentSong
    // },
    // currentSongList(state) {
    //   return state.currentSongList
    // },
    // player(state) {
    //   return state.player
    // },
  },
})