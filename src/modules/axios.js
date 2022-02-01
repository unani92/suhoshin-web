import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const setHeader = header => {
    Object.keys(header).forEach(key => {
        axios.defaults.headers.common[key] = header[key]
    })
    window.sessionStorage.setItem('header', JSON.stringify(header))
}

Vue.prototype.$http = axios

export default {
    setHeader,
}
