import * as $http from 'axios'

export default {
    testLogin: payload => $http.post('auth/test', payload),
    kakaoLogin: authToken => $http.post('auth/login', { authToken }),
    me: () => $http.post('auth/me'),
}
