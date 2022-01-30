import * as $http from 'axios'

export default {
    kakaoLogin: authToken => $http.post('auth/login', { authToken }),
    me: () => $http.get('v2/users/me'),
}
