import Vue from 'vue'
import axios from 'axios'
import { store as $store } from '@/store'
import router from '@/router'

const authorized = res => {
    if (!res) {
        console.error('server might not be responding')
        return false
    }

    let message
    if (typeof res === 'string') {
        message = res
    } else if (typeof res.data === 'string') {
        message = res.data
    } else if (typeof (res.data || {}).msg === 'string') {
        message = res.data.msg
    }

    if (message && message.includes('비밀번호를 잊으셨나요?')) {
        return false
    }

    return true
}

axios.interceptors.response.use(
    res => {
        if (!authorized(res) && router.currentRoute.name !== 'FrontPage') {
            $store.dispatch('signOut')
        }
        return res.data
    },
    err => {
        if (!err.response) {
            throw err
        }

        throw err.response
    }
)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const setHeader = header => {
    Object.keys(header).forEach(key => {
        axios.defaults.headers.common[key] = header[key]
    })
    window.localStorage.setItem('header', JSON.stringify(header))
}

Vue.prototype.$http = axios

export default {
    setHeader,
}
