import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import Cookies from 'js-cookie'

export function formatCount(v) {
  return v >= 10000 ? `${parseInt(v / 10000)}万` : v
}

export function formatDate(v, format = 'YYYY-MM-DD') {
  return dayjs(v).format(format)
}

export function formatTime(v, format = 'HH:MM:SS') {
  dayjs.extend(duration)
  let time = dayjs.duration(v)
  let hours = time.hours().toString()
  let mins = time.minutes().toString()
  let seconds = time.seconds().toString().padStart(2, '0')

  if (format === 'HH:MM:SS') {
    return hours !== '0'
      ? `${hours}:${mins.padStart(2, '0')}:${seconds}`
      : `${mins}:${seconds}`
  }
}

export function formatDt(value) {
  if (!value) return ''
  let min = ~~((value / 60) % 60)
  let sec = (~~(value % 60)).toString().padStart(2, '0')
  return `${min}:${sec}`
}

export function setCookies(string) {
  const cookies = string.split(';;')
  cookies.map(cookie => {
    document.cookie = cookie
    const cookieKeyValue = cookie.split(';')[0].split('=')
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1])
  })
}

export function getCookie(key) {
  return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`)
}

export function formatSongs(songs) {
  return songs.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      singers: item.ar.map(({ id, name }) => ({ id, name })),
      alName: item.al.name,
      aliaName: item.alia[0],
      alId: item.al.id,
      dt: item.dt,
      duration: formatTime(item.dt),
    }
  })
}