import * as $http from 'axios'

export default {
    testLogin: payload => $http.post('auth/test', payload),
    kakaoLogin: accessCode => $http.post('auth/login', { accessCode }),
    me: () => $http.post('auth/me'),
    editNickname: payload => $http.put('auth/edit_nickname', payload),
}
