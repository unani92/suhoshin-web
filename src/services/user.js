import * as $http from 'axios'

export default {
    me: () => $http.get('v2/users/me'),
}
