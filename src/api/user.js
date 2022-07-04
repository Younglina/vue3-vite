import axios from '../utils/axios'

export function login({ phone, password }) {
  return axios.get(`/login/cellphone`, { params: { phone, password } })
}