import axios from '../utils/axios'

/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 * 接口地址 : /personalized
 * 调用例子 : /personalized?limit=1
 */
export function getPersonalized(limit) {
  return axios({
    method: 'get',
    url: '/personalized',
    params: { limit },
  })
}
/**
 * 推荐新音乐
 * 说明 : 调用此接口 , 可获取推荐新音乐
 * 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
 * 接口地址 : /personalized/newsong
 */
export function getPersonalizedNewsong(limit = 10) {
  return axios({
    method: 'get',
    url: '/personalized/newsong',
    params: { limit },
  })
}

/**
 * 获取歌单详情
 * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id,
 * 可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
 * 但是返回的 trackIds 是完整的，tracks 则是不完整的，
 * 可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情
 * 必选参数 : id : 歌单 id
 * 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
 * 接口地址 : /playlist/detail
 * 调用例子 : /playlist/detail?id=24381616
 */
export function getPlaylistDetail({ id, s = 8 }) {
  return axios({
    method: 'get',
    url: '/playlist/detail',
    params: { id, s },
  })
}

/**
 * 获取歌单所有歌曲
 * 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
 * 必选参数 : id : 歌单 id
 * 可选参数 : limit : 限制获取歌曲的数量
 * 接口地址 : /playlist/track/all
 * 调用例子 : /playlist/track/all?id=24381616&limit=10
 */
export function getPlaylistById({ id, limit }) {
  return axios({
    method: 'get',
    url: '/playlist/track/all',
    params: { id, limit },
  })
}

/**
 * 获取音乐 url
 * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
 * 必选参数 : id : 音乐 id
 * 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * 接口地址 : /song/url
 * 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
 */
export function getSongUrl({ id, br }) {
  return axios({
    method: 'get',
    url: '/song/url',
    params: { id, br },
  })
}

/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * 必选参数 : id: 音乐 id
 * 接口地址 : /lyric
 * 调用例子 : /lyric?id=33894312
 */
export function getLyric(id) {
  return axios({
    method: 'get',
    url: '/lyric',
    params: { id },
  })
}

/**
 * 说明 : 调用此接口 ，获取云音乐首页新碟上架数据
 */
export function getAlbumNewest() {
  return axios({
    method: 'get',
    url: '/album/newest',
  })
}

/**
 * 获取每日推荐歌曲
 * 说明 : 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
 * 接口地址 : /recommend/songs
 */
export function getRecommendSongs() {
  return axios({
    method: 'get',
    url: '/recommend/songs',
  })
}

/**
 * 电台 - 推荐
 * 说明 : 登录后调用此接口 , 可获得推荐电台
 * 接口地址 : /dj/recommend
 * 调用例子 : /dj/recommend
 */
export function getRecommendDJ() {
  return axios({
    method: 'get',
    url: '/dj/recommend',
  })
}