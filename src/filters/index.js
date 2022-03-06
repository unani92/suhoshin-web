import { store as $store } from '@/store'
import Vue from 'vue'

const m = arg => Vue.prototype.$moment(arg)

export const translate = key => {
    const locale = $store.getters.translation.locale
    return ($store.getters.translation.texts[key] || {})[locale] || key
}

// formatDate: 'format' can be either
// any format, 'chatList', 'community' or, neglectetimestamp.
export const formatDate = (value, format) => {
    if (!value) return

    const timestamp = m(value)
    const now = m()
    const fallbackFormat = 'YYYY-MM-DD'
    const toKR = result => {
        result = result.replace(/AM/g, '오전')
        result = result.replace(/PM/g, '오후')
        result = result.replace(/am/g, '오전')
        result = result.replace(/pm/g, '오후')
        return result
    }

    if (format === 'default') {
        const month = (value.getMonth() + 1) % 13
        const date = value.getDate()
        let day = value.getDay()

        switch (day) {
            case 0: {
                day = Vue.prototype.$translate('SUNDAY')
                break
            }
            case 1: {
                day = Vue.prototype.$translate('MONDAY')
                break
            }
            case 2: {
                day = Vue.prototype.$translate('TUESDAY')
                break
            }
            case 3: {
                day = Vue.prototype.$translate('WEDNESDAY')
                break
            }
            case 4: {
                day = Vue.prototype.$translate('THURSDAY')
                break
            }
            case 5: {
                day = Vue.prototype.$translate('FRIDAY')
                break
            }
            case 6: {
                day = Vue.prototype.$translate('SATURDAY')
                break
            }
        }

        return `${month}.${date} ${day}`
    }

    /* Used for chat list, like KakaoTalk */
    if (format === 'chatList') {
        const diffDays = m(now.format('YYYY-MM-DD')).diff(m(timestamp.format('YYYY-MM-DD')), 'day')

        // Show time only if it's today.
        if (diffDays === 0) {
            return toKR(timestamp.format('A h:mm'))
        }
        // Show month and day only if it's this year.
        if (diffDays === 1) {
            return '어제'
        }
        // Otherwise, show year, month, day.
        return timestamp.format('M월 D일')
    }

    /* Used for community, like DC inside or Inven */
    if (format === 'community') {
        if (format) {
            return timestamp.format(format) // || 'YYYY-MM-DD HH:mm:ss')
        }
        // Show time only if it's today.
        if (timestamp.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')) {
            return timestamp.format('HH:mm:ss')
        }
        // Show month and day only if it's this year.
        if (timestamp.format('YYYY') === now.format('YYYY')) {
            return timestamp.format('MM-DD HH:mm:ss')
        }
        // Otherwise, show year, month, day.
        return timestamp.format(fallbackFormat)
    }

    if (format) {
        return toKR(timestamp.format(format))
    }
    return toKR(timestamp.format(fallbackFormat))
}

export const humanizeSeconds = seconds => {
    if (seconds < 60) return translate('BEFORE_SECONDS').replace(/%s/, seconds)

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return translate('BEFORE_MINUTES').replace(/%s/, minutes)

    const hours = Math.floor(seconds / 60 / 60)
    if (hours < 24) return translate('BEFORE_HOURS').replace(/%s/, hours)

    const days = Math.floor(seconds / 60 / 60 / 24)
    return translate('BEFORE_DAYS').replace(/%s/, days)
}

export const asAge = birthday => {
    const thisYear = m().format('YYYY')
    const birthYear = m(birthday).format('YYYY')
    return thisYear - birthYear + 1
}

export const gender = gender => (gender === 0 ? 'MALE' : 'FEMALE')

export const currency = (value, decimalCount) => {
    const digitsRegex = /(\d{3})(?=\d)/g
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    decimalCount = decimalCount || 0
    const valueStr = Math.abs(value).toFixed(decimalCount)
    const integer = decimalCount ? valueStr.slice(0, -1 - decimalCount) : valueStr
    const i = integer.length % 3
    const head = i > 0 ? integer.slice(0, i) + (integer.length > 3 ? ',' : '') : ''
    const decimals = decimalCount ? valueStr.slice(-1 - decimalCount) : ''
    const sign = value < 0 ? '-' : ''
    return sign + head + integer.slice(i).replace(digitsRegex, '$1,') + decimals
}

export const alphaNumeric = s => {
    return s.split('').every(c => /^[a-zA-Z0-9가-힣]+$/.test(c))
}

export const school = (profile, considerGraduation) => {
    const schoolTypes = $store.getters.schoolTypes || []

    const wrap = result => {
        if (!considerGraduation) return result

        if (result.includes('졸업')) return result

        return result + (profile.is_student ? ' 재학' : ' 졸업')
    }

    if (profile.university_name && profile.university_name.trim()) {
        return wrap(profile.university_name)
    }

    const schoolType = schoolTypes.find(s => s.id === profile.school_type_id)
    return wrap((schoolType || {}).name)
}

export const $case = {
    toSnake: function (str, delim) {
        if (!str) return

        const upperChars = str.match(/([A-Z])/g)
        if (!upperChars) {
            return str
        }

        for (let i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(new RegExp(upperChars[i]), (delim || '_') + upperChars[i].toLowerCase())
        }

        if (str.slice(0, 1) === (delim || '_')) {
            str = str.slice(1)
        }

        return str
    },
    toConst: function (str) {
        if (!str) return

        return this.toSnake(str).toUpperCase()
    },
    toPascal: function (str, delim, limit) {
        let splitted = str.split(delim || '_')
        if (limit) {
            splitted = splitted.slice(0, limit)
        }

        return splitted.reduce((result, word) => `${result}${this.toCapital(word)}`, '')
    },
    toCamel: function (str, delim) {
        const pascal = this.toPascal(str, delim || '_')
        return pascal[0].toLowerCase() + pascal.substr(1)
    },
    toCapital: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    },
    pluralize: str => {
        if (!str) return

        if (str.toLowerCase().endsWith('s')) return str
        if (str.toLowerCase().endsWith('y')) return str.substr(0, str.length - 1) + 'ies'
        return str + 's'
    },
}

export const dateDiff = (start, end = new Date()) => {
    if (!start) return

    const startDate = new Date(start)
    const dayInMilSec = 1000 * 60 * 60 * 24

    return Math.floor((end - startDate) / dayInMilSec)
}
